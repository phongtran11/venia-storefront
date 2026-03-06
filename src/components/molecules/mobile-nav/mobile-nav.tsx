import { Separator } from "@/components/atoms";
import { GetHeaderDataQuery } from "@/gql/graphql";
import { StoreSwitcher, CurrencySwitcher } from "@/components/molecules";
import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { query } from "@/lib/apollo";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/query";
import { ReCaptchaFormEnum } from "@/gql/graphql";
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
  headerDataQuery,
}: {
  headerDataQuery: GetHeaderDataQuery;
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
        headerDataQuery={headerDataQuery}
        isAuthenticated={isAuthenticated}
        recaptchaConfigs={recaptchaConfigs}
        footer={
          <div className="p-4 flex items-center bg-accent/50 justify-between">
            <div className="flex-1">
              <StoreSwitcher
                headerDataQuery={headerDataQuery}
                currentStore={currentStore || "default"}
              />
            </div>
            <Separator
              orientation="vertical"
              className="h-4 bg-foreground mx-4"
            />
            <div>
              <CurrencySwitcher
                headerDataQuery={headerDataQuery}
                currentCurrency={currentCurrency || "USD"}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
