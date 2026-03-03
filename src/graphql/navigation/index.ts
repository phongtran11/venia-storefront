import { graphql } from "@/gql";

export const GET_NAVIGATION_MENU = graphql(`
  query GetNavigationMenu{
    categories{
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
  }
`);
