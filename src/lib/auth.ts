import { getUserInfo, login } from "@/services/auth.service";
import { loginFormType } from "@/validations/authForm";
import { CookiesOptions, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: false,
      path: '/',
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 360000
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: Required<loginFormType>, req): Promise<User | null> {
        try {
          const token = await login({ 
            email: credentials.email, 
            password: credentials.password 
          }); 

          if (!token) return null;

          return token;
        } catch(err: any) {
          throw new Error(err);
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      const data = await getUserInfo(token.accessToken); 
      
      if (token && data) {
        session.accessToken = token.accessToken;
        token.user = data;
        session.user = data;
      }

      return session;
    }, 
    jwt({ token, user }) { 
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    }
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cookies,
  debug: true
}