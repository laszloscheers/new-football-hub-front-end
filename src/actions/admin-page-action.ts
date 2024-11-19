"use server";

import * as z from "zod";
import { AdminPageSchema } from "@/schemas";
import { GetUserByEmail } from "./get-user-by-email";
import { UpdateUser } from "./update-user";

export const AdminActions = async (
  values: z.infer<typeof AdminPageSchema>,
  email: string
) => {
  try {
    if (email) {
      const user = await GetUserByEmail(email);

      if (user.error) {
        return { error: user.error };
      }

      const updatedUser = await UpdateUser(values as any, user.id);

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
