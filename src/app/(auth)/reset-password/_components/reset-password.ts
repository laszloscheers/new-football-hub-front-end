"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { GetUserByEmail } from "@/actions/get-user-by-email";
import { SignInAsAdministrator } from "@/actions/sign-in-as-admin";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  try {
    const user = await GetUserByEmail(email);

    if (user.error) {
      console.error("User not found:", user.error);
      return { error: user.error };
    }

    const adminToken = await SignInAsAdministrator();
    if (adminToken.error) {
      console.error("Admin sign-in failed:", adminToken.error);
      throw new Error(adminToken.error);
    }

    const resResetPasswordToken = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-reset-token`,
      {
        method: "POST",
        body: JSON.stringify({
          ownerEmail: user.email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken.token}`,
        },
      }
    );

    const contentType = resResetPasswordToken.headers.get("content-type");
    if (!resResetPasswordToken.ok) {
      const errorData = await resResetPasswordToken.text();
      console.error("Failed to generate reset password token:", errorData);
      throw new Error(errorData);
    }

    if (contentType && contentType.includes("application/json")) {
      const resetPasswordToken = await resResetPasswordToken.json();
      if (resetPasswordToken.error) {
        console.error("Reset password token error:", resetPasswordToken.error);
        throw new Error(resetPasswordToken.error);
      }

      await sendPasswordResetEmail(email, resetPasswordToken.token);

      return { success: "Reset password email sent" };
    } else {
      const text = await resResetPasswordToken.text();
      console.error("Unexpected response format:", text);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return { error: "Something went wrong" };
  }
};
