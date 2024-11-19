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

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
};
export const LoginButton = ({ children, mode= "redirect", asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/login");
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
          <LoginForm />
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