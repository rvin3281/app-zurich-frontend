// auth.ts (TypeScript)
import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginFormSchema } from "./lib/schema/loginFormSchema";
import { USER_ROLE } from "./lib/utility/interface/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // jwt session
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },

  //authentication providers
  providers: [
    Google,

    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;
        const { email, password } = await loginFormSchema.parseAsync(
          credentials
        );

        if (!email || !password) {
          return null;
        }

        try {
          console.log("in try block");
          const response = await axios.post(
            "http://localhost:4000/v1/billing/login",
            { email, password }
          );

          user = response.data;

          if (!user) {
            return null;
          }
          console.log("USERRR", user);
          return user;
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      console.log("AUTHORIZED USER", auth);
      console.log("NEXT URL", nextUrl);

      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as USER_ROLE).role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  // debug: process.env.NODE_ENV === ("development" || "local"),
});
