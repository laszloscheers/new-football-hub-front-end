"use server";

import { ExtendedUser } from "@/types/next-auth";
import { SignInAsAdministrator } from "./sign-in-as-admin";

export const DeleteUser = async (userId: number) => {
  try {
    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      throw new Error(adminToken.error);
    }

    const resDeleteUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const contentType = resDeleteUser.headers.get("content-type");
    if (!resDeleteUser.ok) {
      const errorData = await resDeleteUser.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const deletedUser = await resDeleteUser.json();
      if (deletedUser.error) {
        throw new Error(deletedUser.error);
      }
      return { success: "User deleted" };
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
