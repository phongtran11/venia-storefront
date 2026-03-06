import { graphql } from "@/gql";

export const StoreConfigFragment = graphql(`
  fragment StoreConfigFragment on StoreConfig {
    header_logo_src
    logo_alt
    logo_height
    logo_width
  }
`);
