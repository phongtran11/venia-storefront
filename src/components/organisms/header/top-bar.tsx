import { StoreCurrency, StoreView } from "@/components/molecules";
import { Separator } from "@/components/ui";
import { GetStoreConfigQuery } from "@/gql/graphql";

export function TopBar({
  availableStores,
  currency,
  currentStore,
  currentCurrency,
}: {
  availableStores: GetStoreConfigQuery["availableStores"];
  currency: GetStoreConfigQuery["currency"];
  currentStore: string;
  currentCurrency: string;
}) {
  return (
    <div className="flex items-center justify-end bg-accent">
      <StoreView
        availableStores={availableStores}
        currentStore={currentStore}
      />
      <Separator orientation="vertical" className="h-4! bg-foreground" />
      <StoreCurrency currency={currency} currentCurrency={currentCurrency} />
    </div>
  );
}
