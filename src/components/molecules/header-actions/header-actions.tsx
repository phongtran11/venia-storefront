import { Suspense } from "react";
import { Search, User } from "lucide-react";
import { Button, Spinner } from "@/components/atoms";
import { HeaderUserActions } from "@/components/molecules/header-user-actions";
import { HeaderShoppingBag } from "@/components/molecules/header-shopping-bag";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";

function HeaderUserActionsFallback() {
  return (
    <Button variant="ghost" size="sm" disabled className="flex items-center gap-1.5">
      <User className="size-5" />
      <Spinner className="size-4" />
    </Button>
  );
}

export async function HeaderActions() {
  const authToken = await getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const isAuthenticated = Boolean(authToken);

  return (
    <div className="flex items-center gap-1 justify-end">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
      <div className="hidden md:block">
        <Suspense fallback={<HeaderUserActionsFallback />}>
          <HeaderUserActions />
        </Suspense>
      </div>
      <HeaderShoppingBag isAuthenticated={isAuthenticated} />
    </div>
  );
}
