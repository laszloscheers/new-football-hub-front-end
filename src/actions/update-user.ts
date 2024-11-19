"use server";

import { ExtendedUser } from "@/types/next-auth";
import { SignInAsAdministrator } from "./sign-in-as-admin";

export const UpdateUser = async (user: ExtendedUser, userId: number) => {
  const adminToken = await SignInAsAdministrator();

  const resUpdatedUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        ...user,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  const updatedUser = await resUpdatedUser.json();
  if (updatedUser.error) {
    return { error: updatedUser.message };
  }

  return { success: "User updated" };
};
