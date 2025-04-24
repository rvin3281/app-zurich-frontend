"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import LoadingButton from "@/components/ui/loading-button";
import { authenticate } from "@/lib/auth/custom-login";
import { loginFormSchema } from "@/lib/schema/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "./error-message";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const router = useRouter();

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const result = await authenticate(values);

      if (result?.success) {
        window.location.href = "/billing";
      }

      if (result?.message) {
        setError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {error && <ErrorMessage error={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    {...field}
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
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton pending={form.formState.isSubmitting} />
        </form>
      </Form>
    </>
  );
}
