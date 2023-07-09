import { getUserInfo, login } from "@/services/auth.service";
import { loginFormType } from "@/validations/authForm";
import { AxiosError } from "axios";
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
      //@ts-ignore
      async authorize(credentials: Required<loginFormType>, req): Promise<User | null> {
        try {
          const token = await login({ 
            email: credentials.email, 
            password: credentials.password 
          }); 
          //@ts-ignore
          return token;
        } catch(err: any) {
          throw new Error(err.response.data.message);
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      //@ts-ignore
      const data = await getUserInfo(token.accessToken); 
      
      if (token && data) {
        //@ts-ignore
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
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  cookies,
  debug: true
}