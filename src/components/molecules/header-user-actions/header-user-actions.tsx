import { COOKIE_KEYS, getCookie } from "@/lib/cookie";
import { query } from "@/lib/apollo";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/query";
import { ReCaptchaFormEnum } from "@/gql/graphql";
import { AuthPopover } from "@/components/organisms/auth-popover";
import { UserAccountMenu } from "./user-account-menu";

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

export async function HeaderUserActions() {
  const authToken = await getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const isAuthenticated = Boolean(authToken);

  if (isAuthenticated) {
    return <UserAccountMenu />;
  }

  const [login, register, forgotPassword] = await Promise.all([
    fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerLogin),
    fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerCreate),
    fetchRecaptchaConfig(ReCaptchaFormEnum.CustomerForgotPassword),
  ]);

  return (
    <AuthPopover
      recaptchaConfigs={{ login, register, forgotPassword }}
    />
  );
}
