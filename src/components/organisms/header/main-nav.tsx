import {
  HeaderActions,
  MobileNav,
  Logo,
  NavigationMenu,
} from "@/components/molecules";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { Suspense } from "react";

export function MainNav({
  storeConfigData,
}: {
  storeConfigData: GetStoreConfigQuery;
}) {
  return (
    <div className="border-b relative">
      <div className="container flex lg:grid lg:grid-cols-12 items-center justify-between h-16">
        {/* Left Side: Mobile Menu + Logo */}
        <div className="flex items-center gap-4 lg:gap-8 justify-start lg:col-span-2">
          <MobileNav storeConfigData={storeConfigData} />
          <Logo storeConfigQuery={storeConfigData.storeConfig} />
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex lg:justify-center lg:col-span-8">
          <Suspense>
            <NavigationMenu />
          </Suspense>
        </div>

        {/* Right Side: Actions */}
        <div className="flex justify-end lg:col-span-2">
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
