"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ExtendedUser } from "@/types/next-auth";
import { NewUserButtonForm } from "./NewUserForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
  user?: ExtendedUser;
};
export const NewUserButton = ({ children, asChild }: LoginButtonProps) => {
  return (
    <Dialog >
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogTitle className="hidden">
        <VisuallyHidden.Root>Edit User</VisuallyHidden.Root>
      </DialogTitle>
      <VisuallyHidden.Root>
        <DialogDescription>
          A modal dialog for editing a user
        </DialogDescription>
      </VisuallyHidden.Root>
      <DialogContent className="p-0 w-auto bg-transparent border-none"  id="dialog-close">
        <NewUserButtonForm />
      </DialogContent>
    </Dialog>
  )
};