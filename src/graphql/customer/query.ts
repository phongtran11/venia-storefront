import { graphql } from "@/gql";

export const GET_HEADER_CUSTOMER = graphql(`
  query GetHeaderCustomer {
    customer {
      firstname
      lastname
    }
  }
`);

export const GET_BASIC_CUSTOMER_INFO = graphql(`
  query GetBasicCustomerInfo {
    customer {
      firstname
    }
  }
`);
