import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismadb),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub.toString(),
          surname: profile.family_name,
          name: profile.given_name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "mot de passe",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) {
          return null;
        }

        const verifyPassword = await compare(
          credentials.password,
          user.password,
        );
        if (!verifyPassword) {
          return null;
        }

        return {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.raisonSocial || user.name + " " + user.surname,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
  },
};
