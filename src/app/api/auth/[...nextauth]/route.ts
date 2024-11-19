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
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const contentType = res.headers.get("content-type");
          if (!res.ok) {
            const errorData = await res.text();
            console.error("Login failed:", errorData);
            throw new Error(errorData);
          }

          if (contentType && contentType.includes("application/json")) {
            const user = await res.json();
            if (user.error) {
              console.error("User error:", user.error);
              throw new Error(user.error);
            }
            return user;
          } else {
            const text = await res.text();
            console.error("Unexpected response format:", text);
            throw new Error(text);
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT", token, user);
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("SESSION", session, token);
      session.user = token as any;
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
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  debug: true,
});

export { handler as GET, handler as POST };
