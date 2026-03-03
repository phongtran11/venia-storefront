import { graphql } from "@/gql";

export const GET_HEADER_CUSTOMER = graphql(`
  query GetHeaderCustomer {
    customer {
      firstname
    }
  }
`);
