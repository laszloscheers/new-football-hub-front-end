"use client";

import * as z from "zod";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { newPassword } from "@/app/(auth)/new-password/_components/new-password";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";



const NewPasswordFormContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | string[] | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if(data.success) {
            signIn("credentials", {
              password: values.password,
              email: data.email,
              callbackUrl: "/dashboard",
            });
          }
        });
    });
  };
  if(status === "loading") {
    return <p>Loading...</p>;
  }

  if(session?.user) {
    
    router.push("/dashboard");

  } else{
    return (
      <CardWrapper 
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref='/login'
      >
        <Form {... form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
            <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder="Your new password"
                        type="password"
                        autoComplete="new-password"
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
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    )
  }
}

export const NewPasswordForm = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <NewPasswordFormContent />
  </Suspense>
);