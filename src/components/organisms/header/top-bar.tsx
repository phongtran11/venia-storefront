import { CurrencySwitcher, StoreSwitcher } from "@/components/molecules";
import { Separator } from "@/components/atoms";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { GetHeaderDataQuery } from "@/gql/graphql";

export async function TopBar({
  headerDataQuery,
}: {
  headerDataQuery: GetHeaderDataQuery;
}) {
  const [currentStore, currentCurrency] = await Promise.all([
    getCookie(COOKIE_KEYS.STORE_VIEW),
    getCookie(COOKIE_KEYS.CURRENCY),
  ]);

  return (
    <div className="hidden md:block bg-accent">
      <div className="container flex items-center justify-end py-1">
        <StoreSwitcher
          headerDataQuery={headerDataQuery}
          currentStore={currentStore || "default"}
        />
        <Separator orientation="vertical" className="h-4! bg-foreground" />
        <CurrencySwitcher
          headerDataQuery={headerDataQuery}
          currentCurrency={currentCurrency || "USD"}
        />
      </div>
    </div>
  );
}
