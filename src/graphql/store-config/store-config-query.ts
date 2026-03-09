import { graphql } from "@/gql";
export const GET_STORE_CONFIG = graphql(`
  query GetStoreConfig {
    storeConfig {
      ...StoreLogoFragment
    }
    availableStores {
      ...AvailableStoreFragment
    }
    currency {
      ...CurrencyFragment
    }
  }
`);
