import { graphql } from "@/gql";

export const GET_RECAPTCHA_CONFIG = graphql(`
  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {
    recaptchaFormConfig(formType: $formType) {
      __typename
      is_enabled
      configurations {
        __typename
        website_key
        badge_position
      }
    }
  }
`);
