"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@apollo/client/react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Checkbox,
  Spinner,
} from "@/components/atoms";

import { CREATE_CUSTOMER } from "@/graphql/auth/auth-mutation";
import { GetRecaptchaConfigQuery } from "@/gql/graphql";

const registerSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 chars" }),
  is_subscribed: z.boolean().optional(),
});

export type RegisterFormProps = {
  recaptchaConfig: GetRecaptchaConfigQuery["recaptchaFormConfig"] | null;
  onCancel: () => void;
  onSuccess: () => void;
};

export function RegisterForm({
  recaptchaConfig,
  onCancel,
  onSuccess,
}: RegisterFormProps) {
  if (recaptchaConfig?.is_enabled) {
    return (
      <GoogleReCaptchaProvider
        container={{
          parameters: {
            badge:
              (recaptchaConfig.configurations?.badge_position as
                | "inline"
                | "bottomleft"
                | "bottomright"
                | undefined) || "inline",
          },
        }}
        reCaptchaKey={recaptchaConfig?.configurations?.website_key || ""}
      >
        <RecaptchaRegisterFormContent
          recaptchaConfig={recaptchaConfig}
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      </GoogleReCaptchaProvider>
    );
  }

  return <RegisterFormContent onCancel={onCancel} onSuccess={onSuccess} />;
}

function RecaptchaRegisterFormContent({
  recaptchaConfig,
  onCancel,
  onSuccess,
}: RegisterFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return (
    <RegisterFormContent
      onCancel={onCancel}
      onSuccess={onSuccess}
      recaptchaRequired
      getRecaptchaToken={
        recaptchaConfig?.is_enabled && executeRecaptcha
          ? () => executeRecaptcha("customer_create")
          : undefined
      }
    />
  );
}

function RegisterFormContent({
  onCancel,
  onSuccess,
  recaptchaRequired,
  getRecaptchaToken,
}: {
  onCancel: () => void;
  onSuccess: () => void;
  recaptchaRequired?: boolean;
  getRecaptchaToken?: () => Promise<string>;
}) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      is_subscribed: false,
    },
  });

  const recaptchaLoading = recaptchaRequired && !getRecaptchaToken;

  const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: onSuccess,
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const token = getRecaptchaToken ? await getRecaptchaToken() : null;

      await createCustomer({
        variables: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          is_subscribed: values.is_subscribed ?? false,
        },
        context: token ? { headers: { "X-ReCaptcha": token } } : undefined,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">
        Create an Account
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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

          <FormField
            control={form.control}
            name="is_subscribed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Subscribe to news and updates</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm font-medium text-destructive">
              {error.message || "Registration failed."}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={loading || recaptchaLoading}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={loading || recaptchaLoading}
            >
              {loading ? <Spinner className="size-4 mr-2" /> : null}
              CREATE AN ACCOUNT
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
