import { graphql } from "@/gql";

export const AvailableStoreFragment = graphql(`
  fragment AvailableStoreFragment on StoreConfig {
    store_code
    store_name
    is_default_store
  }
`);

export const StoreLogoFragment = graphql(`
  fragment StoreLogoFragment on StoreConfig {
    header_logo_src
    logo_alt
    logo_height
    logo_width
    base_url
  }
`);

export const CurrencyFragment = graphql(`
  fragment CurrencyFragment on Currency {
    available_currency_codes
    default_display_currency_code
  }
`);
