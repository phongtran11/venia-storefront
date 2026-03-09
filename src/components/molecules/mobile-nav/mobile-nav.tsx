import { Separator } from "@/components/atoms";
import { GetStoreConfigQuery } from "@/gql/graphql";
import { StoreSwitcher, CurrencySwitcher } from "@/components/molecules";
import { query } from "@/lib/apollo";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/auth-query";
import { ReCaptchaFormEnum } from "@/gql/graphql";
import { MobileNavSheet } from "./mobile-nav-sheet";
import { MobileNavCategories } from "./mobile-nav-categories";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { Suspense } from "react";

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
  storeConfigData,
}: {
  storeConfigData: GetStoreConfigQuery;
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

  return (
    <div className="lg:hidden flex items-center">
      <MobileNavSheet
        isAuthenticated={isAuthenticated}
        recaptchaConfigs={recaptchaConfigs}
        menuContent={
          <Suspense>
            <MobileNavCategories />
          </Suspense>
        }
        footer={
          <div className="p-4 flex items-center bg-accent/50 justify-between">
            <div className="flex-1">
              <StoreSwitcher
                availableStoresFragmentData={storeConfigData.availableStores}
                currentStore={currentStore || "default"}
              />
            </div>
            <Separator
              orientation="vertical"
              className="h-4 bg-foreground mx-4"
            />
            <div>
              <CurrencySwitcher
                currencyFragmentData={storeConfigData.currency}
                currentCurrency={currentCurrency || "USD"}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
