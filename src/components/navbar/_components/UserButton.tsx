"use client";

import { FaUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@/components/auth/sign-up-button";
import { ClipboardPen, LogInIcon, LogOutIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserButton = () => {
  const { data: session, status } = useSession();

  if(status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full" />
  } else{
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user?.picture || ""} />
            <AvatarFallback className="bg-slate-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
        {session ? (
          <LogoutButton>
            <DropdownMenuItem>
              <LogOutIcon className="w-3 h-3 mr-2" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        ) : (
          <>
            <LoginButton mode="modal" asChild>
              <Button variant="ghost" className="p-0 w-full flex flex-row justify-start pl-2 h-8">
                <LogInIcon className="w-3 h-3 mr-2" />
                Login
              </Button>
            </LoginButton>
            <SignUpButton mode="modal" asChild>
              <Button variant="ghost" className="p-0 w-full flex flex-row justify-start pl-2 h-8">
                <ClipboardPen className="w-3 h-3 mr-2" />
                Sign Up
              </Button>
            </SignUpButton>
          </>
        )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}