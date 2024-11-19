import { GetUserByEmail } from "@/actions/get-user-by-email";
import { SignUpAction } from "@/actions/sign-up-action";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const user = await res.json();
          if (user.error) {
            throw user;
          }
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token.email && !token.sub) {
        const actualUser = await GetUserByEmail(token.email);
        token.name = actualUser.name;
        token.surname = actualUser.surname;
        token.role = actualUser.role;
        token.isOath = false;
      } else {
        token.isOath = true;
      }
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.surname = token.surname;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.isOath = token.isOath;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // check if user is in your database
        if (profile?.email) {
          const userInDB = await GetUserByEmail(
            `google_account_${profile?.email}`
          );
          if (userInDB.error) {
            // add your user in DB here with profile data (profile.email, profile.name)
            await SignUpAction({
              name: profile?.name ?? "",
              surname: profile?.name ?? "",
              email: `google_account_${profile?.email}`,
              password: process.env.GOOGLE_AND_GITHUB_ACCOUNTS_PASSWORD ?? "",
            });
          }
        }
        return true;
      }

      if (account?.provider === "github") {
        // check if user is in your database
        if (profile?.email) {
          const userInDB = await GetUserByEmail(
            `github_account_${profile?.email}`
          );
          if (userInDB.error) {
            // add your user in DB here with profile data (profile.email, profile.name)
            await SignUpAction({
              name: profile?.email ?? "",
              surname: profile?.email ?? "",
              email: `github_account_${profile?.email}`,
              password: process.env.GOOGLE_AND_GITHUB_ACCOUNTS_PASSWORD ?? "",
            });
          }
        }
        return true;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});

export { handler as GET, handler as POST };
