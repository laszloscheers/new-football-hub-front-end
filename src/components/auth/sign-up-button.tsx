"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { LoginForm } from "./login-form";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { SignUpForm } from "./signup-form";

interface SignUpButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
};
export const SignUpButton = ({ children, mode= "redirect", asChild }: SignUpButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/signup");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogTitle className="hidden">
          <VisuallyHidden.Root>Login</VisuallyHidden.Root>
        </DialogTitle>
        <VisuallyHidden.Root>
          <DialogDescription>
            A modal dialog for login
          </DialogDescription>
        </VisuallyHidden.Root>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <SignUpForm />
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}  
    </span>
  )
};