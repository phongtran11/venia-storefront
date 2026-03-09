"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import { setStoreAction } from "@/lib/actions/store-actions";
import { AvailableStoreFragment } from "./store-switcher-fragment";
import { FragmentType, useFragment } from "@/gql";
import { GetStoreConfigQuery } from "@/gql/graphql";

export function StoreSwitcher({
  availableStoresFragmentData,
  currentStore,
}: {
  availableStoresFragmentData: GetStoreConfigQuery["availableStores"];
  currentStore: string;
}) {
  const [mounted, setMounted] = useState(false);

  const availableStores = useFragment(
    AvailableStoreFragment,
    availableStoresFragmentData?.filter(Boolean) as Array<
      FragmentType<typeof AvailableStoreFragment>
    >,
  );

  const activeStore = availableStores?.find(
    (store) => store?.store_code === currentStore || store?.is_default_store,
  );

  const handleValueChange = async (value: string) => {
    await setStoreAction(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 px-3 py-2 text-sm flex items-center">
        {activeStore?.store_name}
      </div>
    );
  }

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={activeStore?.store_code || ""}
    >
      <SelectTrigger className="border-none shadow-none focus-visible:ring-0 [&>_svg]:hidden">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {availableStores?.map((store) =>
            store.store_code && store.store_name ? (
              <SelectItem key={store.store_code} value={store.store_code}>
                {store.store_name}
              </SelectItem>
            ) : null,
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
