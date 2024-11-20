"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { AdminActions } from "@/actions/admin-page-action";
import { useTransition, useState, useEffect } from "react";
import { AdminPageSchema } from "@/schemas";
import { AdminNavbar } from "./_components/admin-nabar";
import { UserInfo } from "@/components/user-info";
import { RoleGate } from "@/components/auth/role-gate";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const AdminPage = () => {
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof AdminPageSchema>>({
    resolver: zodResolver(AdminPageSchema),
      defaultValues: {
        name: session?.user?.name || undefined,
        surname: session?.user.surname || undefined,
        email: session?.user.email || undefined,
        role: session?.user.role || undefined,
        password: undefined,
    }
  });

  useEffect(() => {
    if (session) {
      form.reset({
        name: session.user.name || undefined,
        surname: session.user.surname || undefined,
        email: session.user.email || undefined,
        role: session.user.role || undefined,
        password: undefined,
        // newPassword: undefined,
      });
    }
  }, [session, form]);
  
  const onSubmit = (values: z.infer<typeof AdminPageSchema>) => {
    startTransition(() => {
      AdminActions({
        ...values,
      }, session?.user.email || "")
        .then((data) => {
          if(data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          setError(`Failed to update user data: ${error}`);
        });
    });
  };

  return (
    <RoleGate allowedRoles="admin">
      <div className="flex flex-col gap-y-10 items-center justify-center">
          <AdminNavbar />
          <Card className="w-[80vw] lg:w-[60vw] md:w-[70vw]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Admin Page
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
                      {session?.user?.email}
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
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <UserInfo 
            user={session?.user}
            label="Admin"
          />
      </div>
    </RoleGate>

  );
}

export default AdminPage;
