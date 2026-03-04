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
      <div className="container flex lg:grid lg:grid-cols-12 items-center justify-between h-16">
        {/* Left Side: Mobile Menu + Logo */}
        <div className="flex items-center gap-4 lg:gap-8 justify-start lg:col-span-2">
          <MobileNav
            navigationData={navigationData}
            availableStoresData={availableStoresData}
            currencyData={currencyData}
          />

          <Link
            href="/"
            className="flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto"
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
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex lg:justify-center lg:col-span-8">
          <NavigationMenu navigationData={navigationData} />
        </div>

        {/* Right Side: Actions */}
        <div className="flex justify-end lg:col-span-2">
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
