import { server } from "@/libs/connect";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/models/user";

type AuthUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          await server();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const checkPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!checkPassword) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
