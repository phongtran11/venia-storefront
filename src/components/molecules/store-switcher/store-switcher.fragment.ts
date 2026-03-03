import { graphql } from "@/gql";

export const AvailableStoreFragment = graphql(`
  fragment AvailableStoreFragment on StoreConfig {
    store_code
    store_name
    is_default_store
  }
`);
