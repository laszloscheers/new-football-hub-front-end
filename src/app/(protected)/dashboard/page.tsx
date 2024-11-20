"use client";

import { RoleGate } from "@/components/auth/role-gate";
import UserBoard from "./_components/UserBoard";
import UserDashboard from "./_components/UserDashboard";


const DashboardPage = () => {

  return (
    <RoleGate allowedRoles="user">
      <main className="flex flex-row w-[90%]">
      <UserBoard />
      <UserDashboard />
      </main>
    </RoleGate>

  );
}

export default DashboardPage;
