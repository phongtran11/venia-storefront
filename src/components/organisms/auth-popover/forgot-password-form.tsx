"use client";

import { useState } from "react";
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
  Spinner,
} from "@/components/atoms";

import { REQUEST_PASSWORD_RESET_EMAIL } from "@/graphql/auth/mutation";
import { GetRecaptchaConfigQuery } from "@/gql/graphql";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export type ForgotPasswordFormProps = {
  recaptchaConfig: GetRecaptchaConfigQuery["recaptchaFormConfig"] | null;
  onCancel: () => void;
};

export function ForgotPasswordForm({
  recaptchaConfig,
  onCancel,
}: ForgotPasswordFormProps) {
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
        <RecaptchaForgotPasswordContent
          recaptchaConfig={recaptchaConfig}
          onCancel={onCancel}
        />
      </GoogleReCaptchaProvider>
    );
  }

  return <ForgotPasswordContent onCancel={onCancel} />;
}

function RecaptchaForgotPasswordContent({
  recaptchaConfig,
  onCancel,
}: ForgotPasswordFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return (
    <ForgotPasswordContent
      onCancel={onCancel}
      recaptchaRequired
      getRecaptchaToken={
        recaptchaConfig?.is_enabled && executeRecaptcha
          ? () => executeRecaptcha("customer_forgot_password")
          : undefined
      }
    />
  );
}

function ForgotPasswordContent({
  onCancel,
  recaptchaRequired,
  getRecaptchaToken,
}: {
  onCancel: () => void;
  recaptchaRequired?: boolean;
  getRecaptchaToken?: () => Promise<string>;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recaptchaLoading = recaptchaRequired && !getRecaptchaToken;

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const [requestReset, { loading, error }] = useMutation(
    REQUEST_PASSWORD_RESET_EMAIL,
    {
      onCompleted: () => setIsSubmitted(true),
    },
  );

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const captchaToken = getRecaptchaToken
        ? await getRecaptchaToken()
        : null;

      await requestReset({
        variables: { email: values.email },
        context: captchaToken
          ? { headers: { "X-ReCaptcha": captchaToken } }
          : undefined,
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">
          Check Your Email
        </h3>
        <p className="text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">
            {form.getValues("email")}
          </span>
          , you will receive an email with instructions to reset your password.
        </p>
        <Button className="w-full" onClick={onCancel}>
          BACK TO SIGN IN
        </Button>
      </div>
    );
  }

  const isDisabled = loading || recaptchaLoading;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">
        Forgot Your Password?
      </h3>
      <p className="text-sm text-muted-foreground">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>
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

          {error && (
            <div className="text-sm font-medium text-destructive">
              {error.message || "An error occurred. Please try again."}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isDisabled}
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isDisabled}
            >
              {loading ? <Spinner className="size-4 mr-2" /> : null}
              SUBMIT
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
