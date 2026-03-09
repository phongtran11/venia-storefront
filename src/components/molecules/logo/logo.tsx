"use client";

import Link from "next/link";
import Image from "next/image";
import { useFragment } from "@/gql";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { StoreLogoFragment } from "@/graphql";

export function Logo({
  storeConfigQuery,
}: {
  storeConfigQuery: GetStoreConfigQuery["storeConfig"];
}) {
  const storeConfig = useFragment(StoreLogoFragment, storeConfigQuery);

  return (
    <Link
      href="/"
      className="flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto"
    >
      {storeConfig?.header_logo_src ? (
        <Image
          src={storeConfig.header_logo_src}
          alt={storeConfig.logo_alt || "Store Logo"}
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
  );
}
