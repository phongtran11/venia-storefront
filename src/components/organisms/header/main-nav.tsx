import Link from "next/link";
import { NavigationMenu } from "./navigation-menu";
import { HeaderActions } from "./header-actions";
import Image from "next/image";
import { GetNavigationMenuQuery } from "@/gql/graphql";
import { PreloadQuery } from "@/lib/apollo";
import { GET_HEADER_CUSTOMER } from "@/graphql";
import { Suspense } from "react";
import { Spinner } from "@/components/ui";

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
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
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
        <PreloadQuery query={GET_HEADER_CUSTOMER}>
          <Suspense
            fallback={
              <div className="w-[124px] h-[36px] flex items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <HeaderActions />
          </Suspense>
        </PreloadQuery>
      </div>
    </div>
  );
}
