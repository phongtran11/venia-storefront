"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner,
} from "@/components/atoms";
import { User } from "lucide-react";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { GET_BASIC_CUSTOMER_INFO } from "@/graphql";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const USER_ACCOUNT_ACTIONS = [
  { title: "Order History", href: "/order-history" },
  { title: "Favorites Lists", href: "/wishlist" },
  { title: "Address Book", href: "/address-book" },
  { title: "Saved Payments", href: "/saved-payments" },
  { title: "Communications", href: "/communications" },
  { title: "Account Information", href: "/account-information" },
];

export function UserAccountMenu() {
  const router = useRouter();
  const client = useApolloClient();
  const [isLoggingOut, startTransition] = useTransition();
  const { data, loading } = useQuery(GET_BASIC_CUSTOMER_INFO);

  const handleSignout = () => {
    startTransition(async () => {
      await logoutAction();
      await client.clearStore();
      router.push("/");
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="size-5" />
          {loading || isLoggingOut ? (
            <Spinner className="size-4" />
          ) : (
            <span className="text-sm">Hi, {data?.customer?.firstname}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {USER_ACCOUNT_ACTIONS.map((action) => (
          <DropdownMenuItem key={action.title} asChild>
            <Link href={action.href}>{action.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <span className="text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
