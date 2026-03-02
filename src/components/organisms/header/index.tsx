import { query } from "@/lib/apollo";
import { GET_STORE_CONFIG } from "@/graphql";
import { getCookie } from "@/lib/cookie";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";

export async function Header() {
  const storeConfig = await query({
    query: GET_STORE_CONFIG,
  });

  if (!storeConfig.data?.currency || !storeConfig.data?.availableStores) {
    throw new Error("Failed to load store config");
  }

  const [storeCookie, currencyCookie] = await Promise.all([
    getCookie("store"),
    getCookie("currency"),
  ]);

  return (
    <header className="w-full">
      <TopBar
        availableStores={storeConfig.data.availableStores}
        currency={storeConfig.data.currency}
        currentStore={storeCookie || ""}
        currentCurrency={currencyCookie || ""}
      />
      <MainNav
        logoSrc={storeConfig.data.storeConfig?.header_logo_src}
        logoAlt={storeConfig.data.storeConfig?.logo_alt}
      />
    </header>
  );
}
