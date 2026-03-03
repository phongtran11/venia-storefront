"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { GENERATE_CUSTOMER_TOKEN } from "@/graphql/auth/mutation";
import { loginAction } from "@/lib/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [generateCustomerToken, { loading, error }] = useMutation(
    GENERATE_CUSTOMER_TOKEN,
    {
      onCompleted: async (data) => {
        const token = data?.generateCustomerToken?.token;
        if (token) {
          await loginAction(token);
          router.replace("/");
        }
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await generateCustomerToken({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-border/50 bg-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center text-foreground">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                  {error.message || "An error occurred during login."}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 mt-4 text-center text-sm text-muted-foreground">
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="underline text-primary hover:text-primary/90"
            >
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
