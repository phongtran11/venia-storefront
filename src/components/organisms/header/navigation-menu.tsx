import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { GetNavigationMenuQuery } from "@/gql/graphql";

export function NavigationMenu({
  navigationData,
}: {
  navigationData?: GetNavigationMenuQuery;
}) {
  const categories = navigationData?.categories?.items?.[0]?.children || [];

  const navItems = categories
    .slice()
    .sort((a, b) => Number(a?.position) - Number(b?.position))
    .map((cat) => {
      const children = (cat?.children || [])
        .slice()
        .sort((a, b) => Number(a?.position) - Number(b?.position));

      return {
        label: cat?.name,
        href: `/${cat?.url_path}`,
        uid: cat?.uid,
        hasChildren: children.length > 0,
        children: children.map((child) => ({
          label: child?.name,
          href: `/${child?.url_path}`,
          uid: child?.uid,
        })),
      };
    });

  return (
    <nav className="hidden lg:flex items-center h-full">
      {navItems.map((item) => (
        <div key={item.uid} className="group relative h-full flex items-center">
          <Link
            href={item.href}
            className="flex items-center gap-1 px-4 py-6 text-sm font-medium text-foreground/80 hover:text-foreground group-hover:underline underline-offset-4 transition-colors h-full"
          >
            {item.label}
            {item.hasChildren && (
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            )}
          </Link>

          {item.hasChildren && (
            <div className="absolute top-full left-0 w-max min-w-[400px] bg-background border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-4">
                {item.children.map((child) => (
                  <Link
                    key={child.uid}
                    href={child.href}
                    className="group/link flex flex-col gap-1"
                  >
                    <span className="text-sm font-medium text-foreground group-hover/link:underline underline-offset-4">
                      {child.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
