"use server";
import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";

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

  const resAdminSession = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
    {
      method: "POST",
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  const adminSessionToken = await resAdminSession.json();
  if (adminSessionToken.error) {
    return { error: "Something went wrong" };
  }

  const resExistingToken = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token/${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );

  const existingToken = await resExistingToken.json();
  if (existingToken.error) {
    return { error: "Token has already been used" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email/${existingToken.ownerEmail}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );

  const existingUser = await resUser.json();
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
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );
  const updateUserPassword = await resUpdateUserPassword.json();
  if (updateUserPassword.error) {
    return { error: updateUserPassword.message };
  }

  const resUDeleteUserPassword = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token/${token}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );

  const deletedUserPassword = await resUDeleteUserPassword.json();
  if (deletedUserPassword.error) {
    return { error: deletedUserPassword.message };
  }
  return { success: "Password reset", email: existingUser.email };
};
