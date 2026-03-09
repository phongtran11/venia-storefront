"use server";

import { query } from "@/lib/apollo";
import { GET_NAVIGATION_DATA } from "@/graphql";
import { cacheLife, cacheTag } from "next/cache";

export const getNavigationCategories = async () => {
  "use cache";

  cacheLife({
    expire: 60,
    revalidate: 60,
    stale: 60,
  });

  cacheTag("header-navigation-categories");

  const res = await query({
    query: GET_NAVIGATION_DATA,
  });

  return res.data;
};
