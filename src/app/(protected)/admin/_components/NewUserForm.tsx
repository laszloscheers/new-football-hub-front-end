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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { SignUpAction } from "@/actions/sign-up-action";



export const NewUserButtonForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof AdminPageSchema>>({
    resolver: zodResolver(AdminPageSchema),
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        role: "user",
        password: ""
    }
  });
  
  const onSubmit = (values: z.infer<typeof AdminPageSchema>) => {
    startTransition(() => {
      SignUpAction({
        name: values.name || "",
        surname: values.surname || "",
        email: values.email || "",
        password: values.password || ""
      })
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
          setError(`Failed to create user data: ${error}`);
          toast.error(error);
        });
    });
    (document.querySelector("#dialog-close > button") as HTMLButtonElement).click();
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Create an User
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="Your email"
                        disabled={isPending}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              className="w-full"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}