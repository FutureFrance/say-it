import { getAuthInfo, handleOAuth, login } from "@/services/auth.service";
import { loginFormType } from "@/validations/authForm";
import { CookiesOptions, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      //@ts-ignore
      const data = await getAuthInfo(token.accessToken); 
      
      if (token && data) {
        //@ts-ignore
        session.accessToken = token.accessToken;
        token.user = data;
        session.user = data;
      }

      return session;
    }, 
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {

          const response = await handleOAuth({ 
            email: profile?.email as string, 
            first_name: (profile as any).name as string,
            last_name: (profile as any).given_name as string,
            avatar: (profile as any).picture as string
          });   

          account.access_token = response.data.token;

          return response.data as string;
        } 

        return true;
      } catch(err: any) {
        throw new Error(err.response.data.message);
      } 
    },
    jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token;
      } 
      
      if (account?.access_token) {
        token.accessToken = account.access_token
      }

      return token;
    }
  },
  cookies,
  debug: true
}