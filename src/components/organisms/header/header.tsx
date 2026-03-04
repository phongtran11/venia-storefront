import { query } from "@/lib/apollo";
import { GET_NAVIGATION_MENU } from "@/graphql";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";
import { GET_HEADER_STORE_CONFIG } from "./header.fragment";

export async function Header() {
  const [storeConfigRes, navMenuRes] = await Promise.all([
    query({
      query: GET_HEADER_STORE_CONFIG,
    }),
    query({
      query: GET_NAVIGATION_MENU,
    }),
  ]);

  if (!storeConfigRes.data?.currency || !storeConfigRes.data?.availableStores) {
    return <div>error</div>;
  }

  return (
    <>
      {/* Top Bar: Store View & Currency */}
      <TopBar
        availableStoresData={storeConfigRes.data?.availableStores}
        currencyData={storeConfigRes.data?.currency}
      />
      <header className="w-full sticky top-0 z-50 bg-background">
        {/* Main Navigation: Logo, Navigation Menu, Search, Account, Cart */}
        <MainNav
          logoSrc={storeConfigRes.data.storeConfig?.header_logo_src}
          logoAlt={storeConfigRes.data.storeConfig?.logo_alt}
          navigationData={navMenuRes.data}
          availableStoresData={storeConfigRes.data?.availableStores}
          currencyData={storeConfigRes.data?.currency}
        />
      </header>
    </>
  );
}
