import { query } from "@/lib/apollo";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";
import { GET_STORE_CONFIG } from "@/graphql";

export async function Header() {
  const storeConfigQuery = await query({
    query: GET_STORE_CONFIG,
  });

  const storeConfigData = storeConfigQuery.data;

  if (!storeConfigData) {
    throw new Error("Fail to fetch store config data");
  }

  return (
    <>
      {/* Top Bar: Store View & Currency */}
      <TopBar storeConfigData={storeConfigData} />
      <header className="w-full sticky top-0 z-50 bg-background">
        {/* Main Navigation: Logo, Navigation Menu, Search, Account, Cart */}
        <MainNav storeConfigData={storeConfigData} />
      </header>
    </>
  );
}
