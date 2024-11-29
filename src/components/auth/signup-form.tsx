"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, signUpSchema } from "@/schemas";
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
import { signUp } from "@/app/(auth)/sign-up/_components/sign-up";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { login } from "@/app/(auth)/login/_components/login";

export const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const logIn = (values: z.infer<typeof LoginSchema>) => {
     startTransition(() => {
      login({
        email: values.email,
        password: values.password
      })
        .then((data) => {
          setError(Array.isArray(data.error) ? data.error.join(", ") : data.error)
          setSuccess(data.success);
        });
    });
  }

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setError("");
    setSuccess("");

    await startTransition(() => {
      signUp(values)
        .then((data) => {
          setError(Array.isArray(data.error) ? data.error.join(", ") : data.error);
          setSuccess(data.success);
          if(!data.error){
            logIn({ email: values.email, password: values.password });
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
        headerLabel="Create an account"
        backButtonLabel="Already have an account? Login here."
        backButtonHref='/login'
        showSocial
      >
        <Form {... form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="2xl:space-y-6"
          >
            <div className="2xl:space-y-4">
            <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder="Your name"
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
                        disabled={isPending}
                        placeholder="Your surname"
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
                        disabled={isPending}
                        type="email"
                        placeholder="Your Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        type="password"
                        placeholder="******"
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
              Sign Up
            </Button>
          </form>
        </Form>
      </CardWrapper>
    )
  }
}