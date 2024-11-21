"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AdminPageSchema } from "@/schemas";
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
import { AdminActions } from "@/actions/admin-page-action";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExtendedUser } from "@/types/next-auth";
import { DeleteUser } from "@/actions/delete-user";
import { toast } from "sonner";



export const EditButtonForm = ({ user }: { user: ExtendedUser}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof AdminPageSchema>>({
    resolver: zodResolver(AdminPageSchema),
      defaultValues: {
        name: user?.name || undefined,
        surname: user.surname || undefined,
        email: user.email || undefined,
        role: user.role || undefined,
        password: undefined,
    }
  });
  
  const onSubmit = (values: z.infer<typeof AdminPageSchema>) => {
    startTransition(() => {
      AdminActions({
        ...values,
      }, user.email || "")
        .then((data: { error?: string; success?: string }) => {
          if(data?.error) {
            setError(data.error);
            toast.error(data.error);
          } 
          if (data?.success) {
            router.refresh()
            setSuccess(data.success);
            toast.success(data.success);
          }
        })
        .catch((error: any) => {
          setError(`Failed to update user data: ${error}`);
          toast.error(error);
        });
    });
    (document.querySelector("#dialog-close > button") as HTMLButtonElement).click();
  };

  const deleteUser = () => {
    startTransition(() => {
      DeleteUser(Number(user.id))
        .then((data) => {
          if(data?.error) {
            setError(data.error);
            toast.error(data.error);
          } 
          if (data?.success) {
            router.refresh()
            setSuccess(data.success);
            toast.success(data.success);
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
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Edit User
        </p>
      </CardHeader>
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">
                            Admin
                          </SelectItem>
                          <SelectItem value="user">
                            User
                          </SelectItem>
                        </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
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
      <CardFooter className="pt-8">
      <Card className="border-2 border-red-500">
      <CardHeader className="bg-red-500 border-red-500 text-red-50 p-4 flex items-center gap-2">
        <CardTitle className="mr-auto">Danger zone</CardTitle>
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