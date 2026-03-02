import { ReCaptchaFormEnum } from "@/gql/graphql";
import { GET_RECAPTCHA_CONFIG } from "@/graphql/auth/query";
import { query } from "@/lib/apollo";
import { RegisterWidget } from "@/components/pages";

export default async function RegisterPage() {
  const { data, error } = await query({
    query: GET_RECAPTCHA_CONFIG,
    variables: { formType: ReCaptchaFormEnum.CustomerCreate },
  });

  if (!data?.recaptchaFormConfig || error) {
    return <div>Error loading recaptcha config</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
      <RegisterWidget recaptchaConfig={data.recaptchaFormConfig} />
    </div>
  );
}
