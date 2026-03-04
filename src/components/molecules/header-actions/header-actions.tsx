import { Search } from "lucide-react/";
import { Button } from "@/components/atoms";
import { HeaderUserActions } from "@/components/molecules/header-user-actions";
import { HeaderShoppingBag } from "@/components/molecules/header-shopping-bag";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { query } from "@/lib/apollo";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/query";
import { ReCaptchaFormEnum } from "@/gql/graphql";

export async function HeaderActions() {
  const authToken = await getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const isAuthenticated = Boolean(authToken);

  let recaptchaConfig = null;
  if (!isAuthenticated) {
    try {
      const res = await query({
        query: GET_RECAPTCHA_CONFIG,
        variables: { formType: ReCaptchaFormEnum.CustomerCreate },
      });
      recaptchaConfig = res.data?.recaptchaFormConfig;
    } catch (e) {
      console.error("Failed to fetch recaptcha config", e);
    }
  }

  return (
    <div className="flex items-center gap-1 justify-end">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
      <div className="hidden md:block">
        <HeaderUserActions
          isAuthenticated={isAuthenticated}
          recaptchaConfig={recaptchaConfig}
        />
      </div>
      <HeaderShoppingBag isAuthenticated={isAuthenticated} />
    </div>
  );
}
