import { graphql } from "@/gql";

export const GET_RECAPTCHA_CONFIG = graphql(`
  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {
    recaptchaFormConfig(formType: $formType) {
      is_enabled
      configurations {
        website_key
        badge_position
      }
    }
  }
`);
