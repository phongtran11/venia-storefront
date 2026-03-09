import { CurrencySwitcher, StoreSwitcher } from "@/components/molecules";
import { Separator } from "@/components/atoms";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";

export async function TopBar({
  storeConfigData,
}: {
  storeConfigData: GetStoreConfigQuery;
}) {
  const [currentStore, currentCurrency] = await Promise.all([
    getCookie(COOKIE_KEYS.STORE_VIEW),
    getCookie(COOKIE_KEYS.CURRENCY),
  ]);

  return (
    <div className="hidden md:block bg-accent">
      <div className="container flex items-center justify-end py-1">
        <StoreSwitcher
          availableStoresFragmentData={storeConfigData.availableStores}
          currentStore={currentStore || "default"}
        />
        <Separator orientation="vertical" className="h-4! bg-foreground" />
        <CurrencySwitcher
          currencyFragmentData={storeConfigData.currency}
          currentCurrency={currentCurrency || "USD"}
        />
      </div>
    </div>
  );
}
