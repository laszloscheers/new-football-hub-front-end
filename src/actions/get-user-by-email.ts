"use server";

import { SignInAsAdministrator } from "./sign-in-as-admin";

export const GetUserByEmail = async (email: string) => {
  const adminToken = await SignInAsAdministrator();
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  const existingUser = await resUser.json();
  if (existingUser.error) {
    return { error: existingUser.error };
  }

  return existingUser;
};
