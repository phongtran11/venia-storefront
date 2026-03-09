"use client";

import { DollarSign, Euro } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms";
import { setCurrencyAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFragment } from "@/gql";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { CurrencyFragment } from "@/graphql";

export function CurrencySwitcher({
  currencyFragmentData,
  currentCurrency,
}: {
  currencyFragmentData: GetStoreConfigQuery["currency"];
  currentCurrency: string;
}) {
  const [mounted, setMounted] = useState(false);

  const currency = useFragment(CurrencyFragment, currencyFragmentData);

  const activeCurrencyCode =
    currency?.default_display_currency_code || currentCurrency;

  const currencyIcons = {
    USD: <DollarSign className="h-4 w-4 text-primary" />,
    EUR: <Euro className="h-4 w-4 text-primary" />,
  };

  const handleValueChange = async (value: string) => {
    await setCurrencyAction(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 px-3 py-2 text-sm flex items-center justify-center gap-2">
        {currencyIcons[activeCurrencyCode as keyof typeof currencyIcons]}
        {activeCurrencyCode}
      </div>
    );
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={activeCurrencyCode}>
      <SelectTrigger className="border-none shadow-none focus-visible:ring-0 [&>_svg]:hidden">
        <SelectValue className="flex items-center justify-center" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {currency?.available_currency_codes?.map((currencyCode) =>
            currencyCode ? (
              <SelectItem key={currencyCode} value={currencyCode}>
                {currencyIcons[currencyCode as keyof typeof currencyIcons]}{" "}
                {currencyCode}
              </SelectItem>
            ) : null,
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
