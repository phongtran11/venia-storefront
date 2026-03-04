import Link from "next/link";
import {
  HeaderActions,
  NavigationMenu,
  MobileNav,
} from "@/components/molecules";
import Image from "next/image";
import {
  GetNavigationMenuQuery,
  GetHeaderStoreConfigQuery,
} from "@/gql/graphql";

export async function MainNav({
  logoSrc,
  logoAlt,
  navigationData,
  availableStoresData,
  currencyData,
}: {
  logoSrc?: string | null;
  logoAlt?: string | null;
  navigationData?: GetNavigationMenuQuery;
  availableStoresData?: GetHeaderStoreConfigQuery["availableStores"];
  currencyData?: GetHeaderStoreConfigQuery["currency"];
}) {
  return (
    <div className="border-b relative">
      <div className="container flex items-center justify-between h-16">
        {/* Left Hand Side: Mobile Menu + Logo + Desktop Nav */}
        <div className="flex items-center gap-4 lg:gap-8 flex-1 lg:flex-none">
          <MobileNav
            navigationData={navigationData}
            availableStoresData={availableStoresData}
            currencyData={currencyData}
          />

          <Link
            href="/"
            className="flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none"
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

          {/* Navigation: Categories (Desktop) */}
          <div className="hidden lg:block">
            <NavigationMenu navigationData={navigationData} />
          </div>
        </div>

        {/* Actions: Search, Account, Cart */}
        <HeaderActions />
      </div>
    </div>
  );
}
