import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string | null;
  surname: string | null;
  role: "user" | "admin" | null;
  picture: string | null;
  token: string | null;
  isOath: boolean | null;
  password: string | null;
  preferredMode: "li" | "da" | null;
  preferredLanguage: "en" | "es" | null;
  newPassword: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
