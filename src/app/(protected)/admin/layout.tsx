import { RoleGate } from "@/components/auth/role-gate";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: ProtectedLayoutProps) => { 
  return (
    <RoleGate allowedRoles="admin">
      <div className="full-height w-full flex flex-col gap-y-10 items-center justify-center">
        {children}
      </div>
    </RoleGate>
  );
}

export default AdminLayout;