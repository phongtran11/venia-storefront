import { graphql } from "@/gql";

export const NAVIGATION_MENU_FRAGMENT = graphql(`
  fragment NavigationMenuFragment on CategoryResult {
    items {
      children_count
      children {
        uid
        level
        name
        url_path
        url_key
        position
        children_count
        children {
          uid
          level
          name
          url_path
          url_key
          position
        }
      }
    }
  }
`);
