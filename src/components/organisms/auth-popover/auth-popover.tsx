"use client";

import { useState } from "react";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "@/components/atoms";
import { GetRecaptchaConfigQuery } from "@/gql/graphql";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ForgotPasswordForm } from "./forgot-password-form";

type RecaptchaConfig = GetRecaptchaConfigQuery["recaptchaFormConfig"] | null;

type AuthView = "login" | "register" | "forgot-password";

export function AuthPopover({
  recaptchaConfigs,
}: {
  recaptchaConfigs: {
    login: RecaptchaConfig;
    register: RecaptchaConfig;
    forgotPassword: RecaptchaConfig;
  };
}) {
  const [view, setView] = useState<AuthView>("login");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => setView("login"), 200);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
          <User className="size-5" />
          <span className="text-sm"> Sign In </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[360px] p-6"
        onInteractOutside={(e) => {
          if ((e.target as Element).closest(".grecaptcha-badge")) {
            e.preventDefault();
          }
        }}
      >
        {view === "login" && (
          <LoginForm
            recaptchaConfig={recaptchaConfigs.login}
            onSwitchToRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")}
            onSuccess={() => setIsOpen(false)}
          />
        )}
        {view === "register" && (
          <RegisterForm
            recaptchaConfig={recaptchaConfigs.register}
            onCancel={() => setView("login")}
            onSuccess={() => setView("login")}
          />
        )}
        {view === "forgot-password" && (
          <ForgotPasswordForm
            recaptchaConfig={recaptchaConfigs.forgotPassword}
            onCancel={() => setView("login")}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
