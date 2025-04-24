// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

// Extend the built-in interfaces for Session and User
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // include default properties (name, email, image)
  }
  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

// Extend JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
