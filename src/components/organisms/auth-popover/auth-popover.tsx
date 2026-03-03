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

type AuthView = "login" | "register";

export function AuthPopover({
  recaptchaConfig,
}: {
  recaptchaConfig: GetRecaptchaConfigQuery["recaptchaFormConfig"] | null;
}) {
  const [view, setView] = useState<AuthView>("login");
  const [isOpen, setIsOpen] = useState(false);

  // When popover closes, reset view to login
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
          // Prevent closing if we interact within recaptcha badge
          if ((e.target as Element).closest(".grecaptcha-badge")) {
            e.preventDefault();
          }
        }}
      >
        {view === "login" ? (
          <LoginForm
            onSwitchToRegister={() => setView("register")}
            onSuccess={() => setIsOpen(false)}
          />
        ) : (
          <RegisterForm
            recaptchaConfig={recaptchaConfig}
            onCancel={() => setView("login")}
            onSuccess={() => {
              setView("login");
              // User now has to login with new credentials
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
