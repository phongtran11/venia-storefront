import { Menu, User } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Separator,
} from "@/components/atoms";
import {
  GetNavigationMenuQuery,
  GetHeaderStoreConfigQuery,
} from "@/gql/graphql";
import { StoreSwitcher, CurrencySwitcher } from "@/components/molecules";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";

export async function MobileNav({
  navigationData,
  availableStoresData,
  currencyData,
}: {
  navigationData?: GetNavigationMenuQuery;
  availableStoresData?: GetHeaderStoreConfigQuery["availableStores"];
  currencyData?: GetHeaderStoreConfigQuery["currency"];
}) {
  const [currentStore, currentCurrency, authToken] = await Promise.all([
    getCookie(COOKIE_KEYS.STORE_VIEW),
    getCookie(COOKIE_KEYS.CURRENCY),
    getCookie(COOKIE_KEYS.AUTH_TOKEN),
  ]);

  const isAuthenticated = Boolean(authToken);

  const categories = navigationData?.categories?.items?.[0]?.children || [];
  const navItems = categories
    .slice()
    .sort((a, b) => Number(a?.position) - Number(b?.position));

  return (
    <div className="lg:hidden flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[85vw] max-w-sm p-0 flex flex-col"
        >
          <SheetHeader className="p-4 border-b sr-only">
            <SheetTitle>Main Menu</SheetTitle>
          </SheetHeader>
          <div className="p-4 border-b flex justify-center items-center">
            <span className="text-xl font-light tracking-[0.3em] text-foreground">
              Main Menu
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <div key={item?.uid} className="border-b border-border/50">
                  <Link
                    href={`/${item?.url_path}`}
                    className="flex items-center py-4 px-6 text-base font-medium"
                  >
                    {item?.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t">
            <div className="p-4 flex items-center bg-accent/50 justify-between">
              <div className="flex-1">
                <StoreSwitcher
                  availableStoresFragment={availableStoresData || null}
                  currentStore={currentStore || "default"}
                />
              </div>
              <Separator
                orientation="vertical"
                className="h-4 bg-foreground mx-4"
              />
              <div>
                <CurrencySwitcher
                  currencyFragment={currencyData || null}
                  currentCurrency={currentCurrency || "USD"}
                />
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-semibold">Account</span>
              </div>
              {isAuthenticated ? (
                <Link
                  href="/account-information"
                  className="text-blue-600 font-medium text-sm"
                >
                  View Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-blue-600 font-medium text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
