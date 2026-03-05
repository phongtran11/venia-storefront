import { graphql } from "@/gql";

export const GENERATE_CUSTOMER_TOKEN = graphql(`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);

export const REQUEST_PASSWORD_RESET_EMAIL = graphql(`
  mutation RequestPasswordResetEmail($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`);

export const CREATE_CUSTOMER = graphql(`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $is_subscribed: Boolean
  ) {
    createCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        is_subscribed: $is_subscribed
      }
    ) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`);
