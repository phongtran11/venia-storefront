import { query } from "@/lib/apollo";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";
import { GET_HEADER_DATA } from "./header-query";

export async function Header() {
  const headerDataQuery = await query({
    query: GET_HEADER_DATA,
  });

  if (!headerDataQuery.data) {
    throw new Error("Fail to fetch header data");
  }

  return (
    <>
      {/* Top Bar: Store View & Currency */}
      <TopBar headerDataQuery={headerDataQuery.data} />
      <header className="w-full sticky top-0 z-50 bg-background">
        {/* Main Navigation: Logo, Navigation Menu, Search, Account, Cart */}
        <MainNav headerDataQuery={headerDataQuery.data} />
      </header>
    </>
  );
}
