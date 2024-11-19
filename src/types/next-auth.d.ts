import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  surname: string;
  role: "user" | "admin";
  picture: string;
  token: string;
  isOath: boolean;
  password: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
