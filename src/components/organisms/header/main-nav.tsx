import Link from "next/link";
import { NavigationMenu } from "./navigation-menu";
import { HeaderActions } from "./header-actions";
import Image from "next/image";

export function MainNav({
  logoSrc,
  logoAlt,
}: {
  logoSrc?: string | null;
  logoAlt?: string | null;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b">
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

      {/* Navigation */}
      <NavigationMenu />

      {/* Actions: Search, Account, Cart */}
      <HeaderActions />
    </div>
  );
}
