import prisma from '@/lib/prisma';
import { AuthService } from '@/services/auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          const userCredentials = {
            email: credentials.email,
            password: credentials.password,
          };
          try {
            const res = await AuthService.login(userCredentials.email, userCredentials.password);
            if (!res.error) {
              const user = await res.data;
              return user;
            } else {
              throw new Error(JSON.stringify({
                error: res.message,
                ok: false,
                url: null
              }));
            }
          } catch (error: any) {
            throw new Error(error);
          }
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.uid = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.uid !== null) {
        
        session.user = token.uid;
      }
      return await session;
    }
  },
};

export default nextAuthOptions;
