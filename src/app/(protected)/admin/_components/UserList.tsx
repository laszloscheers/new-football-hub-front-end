"use server";

import { GetUsersAction } from "@/actions/get-users-action";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AdminSearchBar from "./AdminSerachBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CircleUser } from "lucide-react";
import { EditButton } from "./EditButton";
import { NewUserButton } from "./NewUserButton";

const UsersList = async ({ query }: { query: string}) => {

  const users = await GetUsersAction();

  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.surname.toLowerCase().includes(lowerCaseQuery) ||
      `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`.includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery)
    );
  }) : [];

  return (
    <>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-around gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
          <div className="w-full flex-1">
            <AdminSearchBar />
          </div>
          <div className="flex w-full flex-1 justify-end pr-10">
            <NewUserButton mode="modal" asChild >
              <Button size="lg">
                New User
              </Button>
            </NewUserButton>
          </div>
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Users</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6">
        {Array.isArray(users) && users.length === 0 && (
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Users</CardTitle>
              <CardDescription>There is no users to show</CardDescription>
            </CardHeader>
          </Card>
          )}

          <Card>
            <CardHeader className="px-7">
              <CardTitle>USers</CardTitle>
              <CardDescription>Create, edit, or delete users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Preferred Mode</TableHead>
                    <TableHead className="hidden sm:table-cell">Preferred Language</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(users) && filteredUsers.map((user) => (
                    <TableRow className="bg-accent" key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name} {user.surname}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{user.preferredMode}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.preferredLanguage}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <EditButton mode="modal" asChild user={user} >
                          <Button variant="secondary" size="lg">
                            Edit
                          </Button>
                        </EditButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
    </div>

    </>
  )
}

export default  UsersList;