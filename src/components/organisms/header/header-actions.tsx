"use client";

import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export function HeaderActions({ customerName }: { customerName?: string }) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="sm" asChild>
        <Link href="/login" className="flex items-center gap-1.5">
          <User className="h-5 w-5" />
          {customerName ? (
            <span className="text-sm">Hi, {customerName}</span>
          ) : (
            <span className="text-sm">Sign In</span>
          )}
        </Link>
      </Button>

      <Button variant="ghost" size="icon" aria-label="Cart">
        <ShoppingBag className="h-5 w-5" />
      </Button>
    </div>
  );
}
