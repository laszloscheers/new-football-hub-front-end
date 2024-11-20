"use server";

import { SignInAsAdministrator } from "./sign-in-as-admin";

export const SendUpdateUser = async (
  values: {
    name: string | null;
    surname?: string | null;
    email: string | null;
    password?: string | null;
  },
  userId: number
) => {
  try {
    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      throw new Error(adminToken.error);
    }

    const resUpdatedUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          ...values,
        }),
      }
    );

    const contentType = resUpdatedUser.headers.get("content-type");
    if (!resUpdatedUser.ok) {
      const errorData = await resUpdatedUser.text();
      console.log(errorData);
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const updatedUser = await resUpdatedUser.json();
      if (updatedUser.error) {
        throw new Error(updatedUser.error);
      }
      return { success: "User updated" };
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
