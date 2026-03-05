"use client";

import { type ReactNode, useState } from "react";
import { Menu, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
} from "@/components/atoms";
import { GetRecaptchaConfigQuery } from "@/gql/graphql";
import { LoginForm } from "@/components/organisms/auth-popover/login-form";
import { RegisterForm } from "@/components/organisms/auth-popover/register-form";
import { ForgotPasswordForm } from "@/components/organisms/auth-popover/forgot-password-form";
import { MobileNavClient } from "./mobile-nav-client";

type NavItem = {
  uid: string;
  name: string;
  url_path: string;
  children: NavItem[];
};

type RecaptchaConfig = GetRecaptchaConfigQuery["recaptchaFormConfig"] | null;

type MobileView = "menu" | "login" | "register" | "forgot-password";

const VIEW_TITLES: Record<Exclude<MobileView, "menu">, string> = {
  login: "Sign In",
  register: "Register",
  "forgot-password": "Forgot Password",
};

export function MobileNavSheet({
  navItems,
  isAuthenticated,
  recaptchaConfigs,
  footer,
}: {
  navItems: NavItem[];
  isAuthenticated: boolean;
  recaptchaConfigs: {
    login: RecaptchaConfig;
    register: RecaptchaConfig;
    forgotPassword: RecaptchaConfig;
  };
  footer: ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<MobileView>("menu");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => setView("menu"), 200);
    }
  };

  const handleLoginSuccess = () => {
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[85vw] max-w-sm p-0 flex flex-col"
      >
        <SheetHeader className="p-4 border-b sr-only">
          <SheetTitle>
            {view === "menu" ? "Main Menu" : "Account"}
          </SheetTitle>
        </SheetHeader>

        {view === "menu" ? (
          <>
            <div className="p-4 border-b flex justify-center items-center">
              <span className="text-xl font-light tracking-[0.3em] text-foreground">
                Main Menu
              </span>
            </div>
            <div className="flex-1 overflow-auto">
              <MobileNavClient navItems={navItems} />
            </div>
            <div className="mt-auto border-t">
              {footer}
              <div className="p-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Account</span>
                </div>
                {isAuthenticated ? (
                  <Link
                    href="/account-information"
                    className="text-blue-600 font-medium text-sm"
                  >
                    View Account
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="text-blue-600 font-medium text-sm"
                    onClick={() => setView("login")}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border-b flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setView(view === "login" ? "menu" : "login")
                }
                className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={view === "login" ? "Back to menu" : "Back to sign in"}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-xl font-light tracking-[0.3em] text-foreground">
                {VIEW_TITLES[view]}
              </span>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {view === "login" && (
                <LoginForm
                  recaptchaConfig={recaptchaConfigs.login}
                  onSwitchToRegister={() => setView("register")}
                  onForgotPassword={() => setView("forgot-password")}
                  onSuccess={handleLoginSuccess}
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
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
