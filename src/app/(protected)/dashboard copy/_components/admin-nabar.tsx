"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminNavbar = () => {
  const  pathname = usePathname();

  return (
    <nav className="w-[80vw] lg:w-[60vw] md:w-[70vw] bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm">
      <div>
        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">
            Admin
          </Link>
        </Button>
      </div>
        <UserButton />
    </nav>
  );
}