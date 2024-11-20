import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Edit, Languages, SunIcon } from 'lucide-react'
import { useSession } from "next-auth/react";
import { EditButton } from "./EditButton";

export default function UserBoard() {
  
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="mr-10">
      <Card className="px-10">
      <CardHeader className="pb-1 flex items-center">
          <div className=" left-4">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={user?.picture ?? undefined} alt="User avatar" />
              <AvatarFallback>{`${user?.name} image`}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="md:pt-6 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 ">
            <div>
              <CardTitle className="text-3xl font-bold">{user?.name} {user?.surname}</CardTitle>
              <CardDescription>{user?.role}</CardDescription>
            </div>
          </div>
          <div className="gap-4 mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="flex flex-col gap-1 items-start">
                  <p>Email</p>
                  <span className="flex flex-row items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user?.email}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="flex flex-col gap-1 items-start">
                  <p>Preferred Mode</p>
                  <span className="flex flex-row items-center gap-2">
                  <SunIcon className="h-4 w-4 text-muted-foreground" />
                  {user?.preferredMode}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="flex flex-col gap-1 items-start">
                  <p>Preferred Language</p>
                  <span className="flex flex-row items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  {user?.preferredLanguage}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <EditButton mode="modal" asChild user={user} >
              <Button size="lg">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
          </EditButton>
        </CardContent>
      </Card>
    </div>
  )
}
