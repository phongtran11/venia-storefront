import { query } from "@/lib/apollo";
import { GET_NAVIGATION_MENU, GET_STORE_CONFIG } from "@/graphql";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";

export async function Header() {
  const [storeConfigRes, navMenuRes] = await Promise.all([
    query({
      query: GET_STORE_CONFIG,
    }),
    query({
      query: GET_NAVIGATION_MENU,
    }),
  ]);

  if (!storeConfigRes.data?.currency || !storeConfigRes.data?.availableStores) {
    throw new Error("Failed to load store config");
  }

  return (
    <>
      {/* Top Bar: Store View & Currency */}
      <TopBar
        availableStores={storeConfigRes.data.availableStores}
        currency={storeConfigRes.data.currency}
      />
      <header className="w-full sticky">
        {/* Main Navigation: Logo, Navigation Menu, Search, Account, Cart */}
        <MainNav
          logoSrc={storeConfigRes.data.storeConfig?.header_logo_src}
          logoAlt={storeConfigRes.data.storeConfig?.logo_alt}
          navigationData={navMenuRes.data}
        />
      </header>
    </>
  );
}
