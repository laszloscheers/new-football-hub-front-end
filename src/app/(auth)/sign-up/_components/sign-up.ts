"use server";

import * as z from "zod";
import { signUpSchema } from "@/schemas";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, surname, email, password } = validatedFields.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Sign up failed" };
    }

    return { success: "Sign up successful" };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
};
