import { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[80vw] lg:w-[60vw] md:w-[70vw] shadow-sm">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="2xl:space-y-4" >
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Name
          </p>
          <p className="test-sx max-w-[400px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Surname
          </p>
          <p className="test-sx max-w-[400px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.surname}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="test-sx max-w-[400px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="test-sx max-w-[400px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
