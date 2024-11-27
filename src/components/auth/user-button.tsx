"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

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
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const { data: session, status } = useSession();

  if(status === "loading") {
    return <p>Loading...</p>;
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
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className="w-3 h-3 mr-2" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}