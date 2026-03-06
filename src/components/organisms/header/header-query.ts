import { graphql } from "@/gql";

export const GET_HEADER_DATA = graphql(`
  query GetHeaderData {
    storeConfig {
      ...StoreConfigFragment
    }
    availableStores {
      ...AvailableStoreFragment
    }
    currency {
      ...CurrencyFragment
    }
    categories {
      ...NavigationMenuFragment
    }
  }
`);
