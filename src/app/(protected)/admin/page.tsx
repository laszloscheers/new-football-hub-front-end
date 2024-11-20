import Link from "next/link";
import {
  ListIcon,
  Users,
} from "lucide-react";
import UsersList from "./_components/UserList";

const AdminPage = ({ 
  searchParams }: {
     searchParams?:{ 
      query?: string; };
  }) => {

  const query = searchParams?.query || "";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <ListIcon className="h-6 w-6" />
              <span className="">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <UsersList query={query} />
    </div>
  )
}

export default AdminPage;