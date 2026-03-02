"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { CREATE_CUSTOMER } from "@/graphql/auth/mutation";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
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
import { GetRecaptchaConfigQuery } from "@/gql/graphql";

const registerSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export function RegisterForm({
  recaptchaConfig,
}: {
  recaptchaConfig: GetRecaptchaConfigQuery["recaptchaFormConfig"];
}) {
  const router = useRouter();
  const recaptcha = useGoogleReCaptcha();
  const executeRecaptcha = recaptcha?.executeRecaptcha;

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: () => {
      router.push("/login");
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      let token = null;
      if (recaptchaConfig?.is_enabled && executeRecaptcha) {
        token = await executeRecaptcha("customer_create");
      }

      await createCustomer({
        variables: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        },
        context: token
          ? {
              headers: {
                "X-ReCaptcha": token,
              },
            }
          : undefined,
      });
    } catch (e) {
      // Error handled by Apollo Client, displayed in UI
      console.error(e);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl border-border/50 bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center text-foreground">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your details below to register
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                {error.message || "An error occurred during registration."}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 mt-4 text-center text-sm text-muted-foreground">
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="underline text-primary hover:text-primary/90"
          >
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export function RegisterWidget({
  recaptchaConfig,
}: {
  recaptchaConfig: GetRecaptchaConfigQuery["recaptchaFormConfig"];
}) {
  if (recaptchaConfig?.is_enabled) {
    return (
      <GoogleReCaptchaProvider
        container={{
          parameters: {
            badge: recaptchaConfig.configurations?.badge_position as
              | "inline"
              | "bottomleft"
              | "bottomright",
          },
        }}
        reCaptchaKey={recaptchaConfig?.configurations?.website_key || ""}
      >
        <RegisterForm recaptchaConfig={recaptchaConfig} />
      </GoogleReCaptchaProvider>
    );
  }

  return <RegisterForm recaptchaConfig={recaptchaConfig} />;
}
