import { Separator } from "@/components/atoms";
import {
  GetNavigationMenuQuery,
  GetHeaderStoreConfigQuery,
  ReCaptchaFormEnum,
} from "@/gql/graphql";
import { StoreSwitcher, CurrencySwitcher } from "@/components/molecules";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { query } from "@/lib/apollo";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/query";
import { MobileNavSheet } from "./mobile-nav-sheet";

async function fetchRecaptchaConfig(formType: ReCaptchaFormEnum) {
  try {
    const res = await query({
      query: GET_RECAPTCHA_CONFIG,
      variables: { formType },
    });
    return res.data?.recaptchaFormConfig ?? null;
  } catch {
    return null;
  }
}

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

  let recaptchaConfigs = {
    login: null as Awaited<ReturnType<typeof fetchRecaptchaConfig>>,
    register: null as Awaited<ReturnType<typeof fetchRecaptchaConfig>>,
    forgotPassword: null as Awaited<ReturnType<typeof fetchRecaptchaConfig>>,
  };

  if (!isAuthenticated) {
    const [login, register, forgotPassword] = await Promise.all([
      fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerLogin),
      fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerCreate),
      fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerForgotPassword),
    ]);
    recaptchaConfigs = { login, register, forgotPassword };
  }

  const categories = navigationData?.categories?.items?.[0]?.children || [];
  const navItems = categories
    .slice()
    .sort((a, b) => Number(a?.position) - Number(b?.position))
    .map((cat) => {
      const children = (cat?.children || [])
        .slice()
        .sort((a, b) => Number(a?.position) - Number(b?.position));

      return {
        uid: cat?.uid || "",
        name: cat?.name || "",
        url_path: cat?.url_path || "",
        children: children.map((child) => ({
          uid: child?.uid || "",
          name: child?.name || "",
          url_path: child?.url_path || "",
          children: [],
        })),
      };
    });

  return (
    <div className="lg:hidden flex items-center">
      <MobileNavSheet
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        recaptchaConfigs={recaptchaConfigs}
        footer={
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
        }
      />
    </div>
  );
}
