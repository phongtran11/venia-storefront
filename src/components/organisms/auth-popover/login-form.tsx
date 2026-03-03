"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Spinner,
} from "@/components/atoms";

import { GENERATE_CUSTOMER_TOKEN } from "@/graphql/auth/mutation";
import { loginAction } from "@/lib/actions/auth-actions";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm({
  onSwitchToRegister,
  onSuccess,
}: {
  onSwitchToRegister: () => void;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const client = useApolloClient();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [generateCustomerToken, { loading, error }] = useMutation(
    GENERATE_CUSTOMER_TOKEN,
    {
      onCompleted: (data) => {
        const token = data?.generateCustomerToken?.token;
        if (token) {
          startTransition(async () => {
            await loginAction(token);
            await client.clearStore();
            onSuccess();
            router.refresh();
          });
        }
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await generateCustomerToken({ variables: values });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">
        Sign-In To Your Account
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && (
            <div className="text-sm font-medium text-destructive">
              {error.message || "An error occurred during login."}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || isPending}
            >
              {loading || isPending ? (
                <Spinner className="size-4 mr-2" />
              ) : null}
              SIGN IN
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full text-primary border-primary hover:bg-primary/5"
              onClick={onSwitchToRegister}
            >
              CREATE AN ACCOUNT
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
