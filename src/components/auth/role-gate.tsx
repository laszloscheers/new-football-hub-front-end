"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: "admin" | "user";
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const { data: session, status } = useSession();
   console.log(session);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if(!session) {
    router.push("/login");
    return <p>Loading...</p>;
  }

  if (session?.user.role !== allowedRoles) {
    if(session?.user.role === "user") 
      router.push("/dashboard");
    else if(session?.user.role === "admin") {
      router.push("/admin");
    } else{
      router.push("/dashboard");
    }
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};