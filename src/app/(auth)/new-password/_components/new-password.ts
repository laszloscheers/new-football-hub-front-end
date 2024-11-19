"use server";
import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { SignInAsAdministrator } from "@/actions/sign-in-as-admin";
import { GetUserByEmail } from "@/actions/get-user-by-email";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedFields.data;

  try {
    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      throw new Error(adminToken.error);
    }

    const resExistingToken = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken.token}`,
        },
      }
    );

    const contentType = resExistingToken.headers.get("content-type");
    if (!resExistingToken.ok) {
      const errorData = await resExistingToken.text();
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const existingToken = await resExistingToken.json();
      if (existingToken.error) {
        return { error: "Token has already been used" };
      }

      const hasExpired = new Date(existingToken.expiresAt) < new Date();
      if (hasExpired) {
        return { error: "Token has expired" };
      }

      const existingUser = await GetUserByEmail(existingToken.ownerEmail);
      if (existingUser.error) {
        return { error: existingUser.error };
      }

      const resUpdateUserPassword = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${existingUser.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken.token}`,
          },
        }
      );

      const updateContentType =
        resUpdateUserPassword.headers.get("content-type");
      if (!resUpdateUserPassword.ok) {
        const errorData = await resUpdateUserPassword.text();
        throw new Error(errorData);
      }

      if (updateContentType && updateContentType.includes("application/json")) {
        const updateUserPassword = await resUpdateUserPassword.json();
        if (updateUserPassword.error) {
          return { error: updateUserPassword.message };
        }

        const resDeleteUserToken = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token/${token}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken.token}`,
            },
          }
        );

        const deleteContentType =
          resDeleteUserToken.headers.get("content-type");
        if (!resDeleteUserToken.ok) {
          const errorData = await resDeleteUserToken.text();
          throw new Error(errorData);
        }

        if (
          deleteContentType &&
          deleteContentType.includes("application/json")
        ) {
          const deletedUserPassword = await resDeleteUserToken.json();
          if (deletedUserPassword.error) {
            return { error: deletedUserPassword.message };
          }
          return { success: "Password reset", email: existingUser.email };
        } else {
          const text = await resDeleteUserToken.text();
          throw new Error("Unexpected response format");
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
