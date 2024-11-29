"use client";

import * as z from "zod";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "@/app/(auth)/reset-password/_components/reset-password";
import { ResetSchema } from "@/schemas";
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



export const ResetForm = () => {
  const [error, setError] = useState<string | string[] | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const { data: session, status } = useSession();
  
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
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
        headerLabel="Forgot your password?"
        backButtonLabel="Back to login"
        backButtonHref='/login'
      >
        <Form {... form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="2xl:space-y-6"
          >
            <div className="2xl:space-y-4">
              <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="Your Email"
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
              Send reset link
            </Button>
          </form>
        </Form>
      </CardWrapper>
    )
  }
}

