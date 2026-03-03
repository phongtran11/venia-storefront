import Link from "next/link";
import { HeaderActions, NavigationMenu } from "@/components/molecules";
import Image from "next/image";
import { GetNavigationMenuQuery } from "@/gql/graphql";

export async function MainNav({
  logoSrc,
  logoAlt,
  navigationData,
}: {
  logoSrc?: string | null;
  logoAlt?: string | null;
  navigationData?: GetNavigationMenuQuery;
}) {
  return (
    <div className="border-b relative">
      <div className="container grid grid-cols-12">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 col-span-2 flex items-center justify-center"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoAlt || "Store Logo"}
              width={24}
              height={24}
              className="h-6"
            />
          ) : (
            <span className="text-xl font-light tracking-[0.3em] text-foreground">
              VENIA
            </span>
          )}
        </Link>

        {/* Navigation: Categories */}
        <NavigationMenu navigationData={navigationData} />

        {/* Actions: Search, Account, Cart */}
        <HeaderActions />
      </div>
    </div>
  );
}
