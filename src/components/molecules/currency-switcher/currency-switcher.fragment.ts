import { graphql } from "@/gql";

export const CurrencyFragment = graphql(`
  fragment CurrencyFragment on Currency {
    available_currency_codes
    default_display_currency_code
  }
`);
