"use server";

import { ExtendedUser } from "@/types/next-auth";

export const getUserLeagues = async (user: ExtendedUser) => {
  if (!user?.token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email:
            user?.picture?.includes("github") ?? false
              ? `github_account_${user?.email}`
              : `google_account_${user?.email}`,
          password: process.env.GOOGLE_AND_GITHUB_ACCOUNTS_PASSWORD,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const userToken1 = await res.json();

    const LeaguesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/leagues`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken1.token}`,
        },
      }
    );
    const Leagues = await LeaguesRes.json();
    return Leagues;
  } else {
    const LeaguesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/leagues`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const Leagues = await LeaguesRes.json();
    return Leagues;
  }
};
