declare module '@heroicons/*';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string;
    phone: string;
    role: 'ADMIN' | 'REDATOR';
  }

  interface Session extends DefaultSession {
    user: User;
    expires: string;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: User;
  }
}
