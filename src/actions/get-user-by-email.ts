"use server";

import { SignInAsAdministrator } from "./sign-in-as-admin";

export const GetUserByEmail = async (email: string) => {
  try {
    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      throw new Error(adminToken.error);
    }

    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const contentType = resUser.headers.get("content-type");
    if (!resUser.ok) {
      const errorData = await resUser.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const existingUser = await resUser.json();
      if (existingUser.error) {
        throw new Error(existingUser.error);
      }
      return existingUser;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
