declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_URL: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_DEFAULT_BACKGROUND_IMAGE: string;
  }
}