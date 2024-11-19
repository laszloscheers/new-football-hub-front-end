import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = await LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Validation failed" };
  }

  const { email, password } = validatedFields.data;

  const responseNextAuth = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (responseNextAuth?.error) {
    return { error: responseNextAuth.error.split(",") };
  }

  return { success: "Logged in" };
};
