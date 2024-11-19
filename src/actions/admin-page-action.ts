"use server";

import * as z from "zod";
import { AdminPageSchema } from "@/schemas";
import { GetUserByEmail } from "./get-user-by-email";
import { UpdateUser } from "./update-user";

export const AdminActions = async (
  values: z.infer<typeof AdminPageSchema>,
  email: string
) => {
  if (email) {
    const user = await GetUserByEmail(email);

    if (user.error) {
      return { error: user.error };
    }
    const updateUser = await UpdateUser(values as any, user.id);

    if (updateUser.error) {
      return { error: updateUser.error };
    }

    return { success: "User updated" };
  }
};
