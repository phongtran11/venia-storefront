import { query } from "@/lib/apollo";
import { MobileNavClient } from "./mobile-nav-client";
import { GET_NAVIGATION_DATA, formatNavigationCategories } from "@/graphql";

export async function MobileNavCategories() {
  const navigationDataQuery = await query({
    query: GET_NAVIGATION_DATA,
  });

  if (!navigationDataQuery.data) {
    return null;
  }

  const navItems = formatNavigationCategories(
    navigationDataQuery.data?.categories,
  );

  return <MobileNavClient navItems={navItems} />;
}
