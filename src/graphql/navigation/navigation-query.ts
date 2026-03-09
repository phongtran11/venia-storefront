import { graphql } from "@/gql";

export const GET_NAVIGATION_DATA = graphql(`
  query GetNavigationData {
    categories {
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
