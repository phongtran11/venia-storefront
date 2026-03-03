import { CurrencySwitcher, StoreSwitcher } from "@/components/molecules";
import { Separator } from "@/components/ui";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";

export async function TopBar({
  availableStores,
  currency,
}: {
  availableStores: GetStoreConfigQuery["availableStores"];
  currency: GetStoreConfigQuery["currency"];
}) {
  const [currentStore, currentCurrency] = await Promise.all([
    getCookie(COOKIE_KEYS.STORE_VIEW),
    getCookie(COOKIE_KEYS.CURRENCY),
  ]);

  return (
    <div className="bg-accent">
      <div className="container flex items-center justify-end">
        <StoreSwitcher
          availableStores={availableStores}
          currentStore={currentStore || "default"}
        />
        <Separator orientation="vertical" className="h-4! bg-foreground" />
        <CurrencySwitcher
          currency={currency}
          currentCurrency={currentCurrency || "USD"}
        />
      </div>
    </div>
  );
}
