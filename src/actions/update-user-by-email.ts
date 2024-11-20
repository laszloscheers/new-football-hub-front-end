"use server";

import * as z from "zod";
import { UserPageSchema } from "@/schemas";
import { GetUserByEmail } from "./get-user-by-email";
import { SignInAction } from "./sign-in-action";
import { SendUpdateUser } from "./send-update-user-by-email";

export const UpdateUserByEmail = async (
  values: z.infer<typeof UserPageSchema>,
  email: string
) => {
  try {
    if (email) {
      const user = await GetUserByEmail(email);

      if (user.error) {
        return { error: user.error };
      }
      if (values.newPassword) {
        const session = await SignInAction({
          email: values.email,
          password: values.password ?? "",
        });
        if (!session) {
          return { error: session.error };
        }
        const updatedUser = await SendUpdateUser(
          {
            name: values?.name ?? null,
            surname: values?.surname ?? null,
            email: values?.email ?? null,
            password: values?.newPassword ?? null,
          },
          user.id
        );
        if (updatedUser.error) {
          return { error: updatedUser.error };
        }
      }

      const updatedUser = await SendUpdateUser(
        {
          name: values?.name ?? null,
          surname: values?.surname ?? null,
          email: values?.email ?? null,
        },
        user.id
      );

      if (updatedUser.error) {
        return { error: updatedUser.error };
      }

      return { success: "User Updated" };
    } else {
      throw new Error("Email is required");
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
