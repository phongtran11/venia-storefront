import { graphql } from "@/gql";

export const GET_HEADER_STORE_CONFIG = graphql(`
  query GetHeaderStoreConfig {
    storeConfig {
      header_logo_src
      logo_alt
      logo_height
      logo_width
    }
    availableStores {
      ...AvailableStoreFragment
    }
    currency {
      ...CurrencyFragment
    }
  }
`);
