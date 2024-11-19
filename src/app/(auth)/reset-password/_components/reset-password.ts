"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

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

  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/email/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );

  const user = await resUser.json();
  if (user.error) {
    return { error: `User with email ${email} not found` };
  }

  const resResetPasswordToken = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token`,
    {
      method: "POST",
      body: JSON.stringify({
        ownerEmail: process.env.ADMIN_EMAIL,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSessionToken.token}`,
      },
    }
  );

  const resetPasswordToken = await resResetPasswordToken.json();
  if (resetPasswordToken.error) {
    return { error: "Something went wrong" };
  }

  await sendPasswordResetEmail(email, resetPasswordToken.token);

  return { success: "Reset password email sent" };
};
