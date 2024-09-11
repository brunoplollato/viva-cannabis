import prisma from '@/lib/prisma';
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
            const res = await fetch(
              `${process.env.VERCEL_URL}/api/login?email=${userCredentials.email}&password=${userCredentials.password}`
            );
            const data = await res.json();
            const user = data.data

            if (res.ok && user) {
              return user;
            } else {
              return null;
            }
          } catch (err) {
            return null;
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
