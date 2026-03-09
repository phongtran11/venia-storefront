import { GetNavigationDataQuery } from "@/gql/graphql";

export function formatNavigationCategories(
  categoriesData?: GetNavigationDataQuery["categories"] | null
) {
  const categories = categoriesData?.items?.[0]?.children ?? [];

  return categories
    .slice()
    .sort((a, b) => Number(a?.position) - Number(b?.position))
    .map((cat) => {
      const children = (cat?.children || [])
        .slice()
        .sort((a, b) => Number(a?.position) - Number(b?.position));

      return {
        uid: cat?.uid || "",
        name: cat?.name || "",
        label: cat?.name || "",
        url_path: cat?.url_path || "",
        href: `/${cat?.url_path || ""}`,
        hasChildren: children.length > 0,
        children: children.map((child) => ({
          uid: child?.uid || "",
          name: child?.name || "",
          label: child?.name || "",
          url_path: child?.url_path || "",
          href: `/${child?.url_path || ""}`,
          children: [],
        })),
      };
    });
}
