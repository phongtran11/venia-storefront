"use client";

import { DollarSign, Euro } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { setCurrencyAction } from "@/lib/actions/store-actions";
import { useEffect, useState } from "react";

export function StoreCurrency({
  currency,
  currentCurrency,
}: {
  currency: GetStoreConfigQuery["currency"];
  currentCurrency: string;
}) {
  const [mounted, setMounted] = useState(false);

  const activeCurrencyCode =
    currentCurrency || currency?.default_display_currency_code;

  const currencyIcons = {
    USD: <DollarSign className="mr-2 h-4 w-4" />,
    EUR: <Euro className="mr-2 h-4 w-4" />,
  };

  const handleValueChange = async (value: string) => {
    await setCurrencyAction(value);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 px-3 py-2 text-sm flex items-center gap-2">
        {currencyIcons[activeCurrencyCode as keyof typeof currencyIcons]}{" "}
        {activeCurrencyCode}
      </div>
    );
  }

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={activeCurrencyCode || ""}
    >
      <SelectTrigger className="border-none shadow-none focus-visible:ring-0 [&>_svg]:hidden">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {currency?.available_currency_codes?.map((currencyCode) => (
            <SelectItem key={currencyCode} value={currencyCode || ""}>
              {currencyIcons[currencyCode as keyof typeof currencyIcons]}
              {currencyCode}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
