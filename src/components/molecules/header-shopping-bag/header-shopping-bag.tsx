"use client";

import { Button } from "@/components/atoms";
import { GET_BASIC_CUSTOMER_INFO } from "@/graphql";
import { useQuery } from "@apollo/client/react";
import { ShoppingBag } from "lucide-react";

export function HeaderShoppingBag({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const basicCustomerInfoRes = useQuery(GET_BASIC_CUSTOMER_INFO, {
    skip: !isAuthenticated,
  });

  const customerOrdersCount = 0; // TODO: restore when orders are added back to query

  return (
    <Button variant="ghost" size="icon" aria-label="Cart">
      <ShoppingBag className="h-5 w-5" />
      {customerOrdersCount > 0 ? (
        <HeaderShoppingBagCount count={customerOrdersCount} />
      ) : null}
    </Button>
  );
}

export function HeaderShoppingBagCount({ count }: { count: number }) {
  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
      {count}
    </span>
  );
}
