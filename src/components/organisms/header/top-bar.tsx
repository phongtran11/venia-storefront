import { CurrencySwitcher, StoreSwitcher } from "@/components/molecules";
import { Separator } from "@/components/atoms";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { GetHeaderStoreConfigQuery } from "@/gql/graphql";

export async function TopBar({
  availableStoresData,
  currencyData,
}: {
  availableStoresData: GetHeaderStoreConfigQuery["availableStores"];
  currencyData: GetHeaderStoreConfigQuery["currency"];
}) {
  const [currentStore, currentCurrency] = await Promise.all([
    getCookie(COOKIE_KEYS.STORE_VIEW),
    getCookie(COOKIE_KEYS.CURRENCY),
  ]);

  return (
    <div className="bg-accent">
      <div className="container flex items-center justify-end">
        <StoreSwitcher
          availableStoresFragment={availableStoresData}
          currentStore={currentStore || "default"}
        />
        <Separator orientation="vertical" className="h-4! bg-foreground" />
        <CurrencySwitcher
          currencyFragment={currencyData}
          currentCurrency={currentCurrency || "USD"}
        />
      </div>
    </div>
  );
}
