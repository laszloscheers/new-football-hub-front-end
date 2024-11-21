"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserPageSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExtendedUser } from "@/types/next-auth";
import { DeleteUser } from "@/actions/delete-user";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { UpdateUserByEmail } from "@/actions/update-user-by-email";
import { GetUserByEmail } from "@/actions/get-user-by-email";



export const EditButtonForm = ({ user }: { user: ExtendedUser}) => {
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof UserPageSchema>>({
    resolver: zodResolver(UserPageSchema),
      defaultValues: {
        name: session?.user?.name || undefined,
        surname: session?.user.surname || undefined,
        email: session?.user.email || undefined,
        password: undefined,
        newPassword: undefined,
    }
  });
  
  const onSubmit = (values: z.infer<typeof UserPageSchema>) => {
    startTransition(() => {
      UpdateUserByEmail({
        ...values,
      }, session?.user.email || "")
        .then((data) => {
          if(data?.error) {
            setError(data.error);
            toast.error(data.error);
          }
          if (data?.success) {
            update();
            setSuccess(data.success);
            toast.success(data.success);
          }
        })
        .catch((error) => {
          setError(`Failed to update user data: ${error}`);
          toast.error(error);
        });
    });
  };

  const deleteUser = () => {
    startTransition(async () => {
      if (!user?.email) {
        setError("User email is undefined");
        return;
      }
      const fetchedUser = await GetUserByEmail(user.email);
      DeleteUser(Number(fetchedUser.id))
        .then((data) => {
          if(data?.error) {
            setError(data.error);
            toast.error(data.error);
          } 
          if (data?.success) {
            setSuccess(data.success);
            toast.success(data.success);
            signOut();
          }
        })
        .catch((error) => {
          setError(`Failed to update user data: ${error}`);
          toast.error(error);
        });
    });
    (document.querySelector("#dialog-close > button") as HTMLButtonElement).click();
  }

  return (
    <Card className="w-[400px] shadow-md pt-12">
      <CardContent>
        <Form {...form}>
          <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="Your name"
                        disabled={isPending}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="Your surname"
                        disabled={isPending}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm font-medium">Email</p>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="md:text-sm font-medium text-gray-600">
                {user?.email}
                </p>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="********"
                        disabled={isPending}
                        type="password"

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="********"
                        disabled={isPending}
                        type="password"

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <FormError message={error as any} />
            <FormSuccess message={success as any} />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="pt-2">
      <Card className="border-2 border-red-500">
      <CardHeader className=" border-red-500 border-b-2 text-red-50 p-4 flex items-center gap-2">
        <CardTitle className="text-red-600 mr-auto">Danger zone!</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <p>
          This will permanently delete the user from the system.
        </p>
        <Button
          disabled={isPending}
          variant="destructive"
          className="w-full"
          onClick={deleteUser}
        >
          Delete User
        </Button>
      </CardContent>
    </Card>

      </CardFooter>
    </Card>
  )
}