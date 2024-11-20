"use server";

import { SignInAsAdministrator } from "./sign-in-as-admin";

export const GetUsersAction = async () => {
  try {
    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      throw new Error(adminToken.error);
    }

    const resUsers = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    const contentType = resUsers.headers.get("content-type");
    if (!resUsers.ok) {
      const errorData = await resUsers.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const users = await resUsers.json();
      if (users.error) {
        throw new Error(users.error);
      }
      return users;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
