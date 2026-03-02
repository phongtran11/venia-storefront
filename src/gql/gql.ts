/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n": typeof types.GenerateCustomerTokenDocument,
    "\n  mutation CreateCustomer(\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $password: String!\n  ) {\n    createCustomerV2(\n      input: {\n        firstname: $firstname\n        lastname: $lastname\n        email: $email\n        password: $password\n      }\n    ) {\n      customer {\n        firstname\n        lastname\n        email\n      }\n    }\n  }\n": typeof types.CreateCustomerDocument,
    "\n  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {\n    recaptchaFormConfig(formType: $formType) {\n      __typename\n      is_enabled\n      configurations {\n        __typename\n        website_key\n        badge_position\n      }\n    }\n  }\n": typeof types.GetRecaptchaConfigDocument,
    "\n  query GetStoreConfig {\n    storeConfig {\n      store_code\n      store_name\n      header_logo_src\n      logo_alt\n      default_display_currency_code\n    }\n    availableStores {\n      store_code\n      store_name\n      is_default_store\n    }\n    currency {\n      available_currency_codes\n      default_display_currency_code\n    }\n  }\n": typeof types.GetStoreConfigDocument,
};
const documents: Documents = {
    "\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n": types.GenerateCustomerTokenDocument,
    "\n  mutation CreateCustomer(\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $password: String!\n  ) {\n    createCustomerV2(\n      input: {\n        firstname: $firstname\n        lastname: $lastname\n        email: $email\n        password: $password\n      }\n    ) {\n      customer {\n        firstname\n        lastname\n        email\n      }\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {\n    recaptchaFormConfig(formType: $formType) {\n      __typename\n      is_enabled\n      configurations {\n        __typename\n        website_key\n        badge_position\n      }\n    }\n  }\n": types.GetRecaptchaConfigDocument,
    "\n  query GetStoreConfig {\n    storeConfig {\n      store_code\n      store_name\n      header_logo_src\n      logo_alt\n      default_display_currency_code\n    }\n    availableStores {\n      store_code\n      store_name\n      is_default_store\n    }\n    currency {\n      available_currency_codes\n      default_display_currency_code\n    }\n  }\n": types.GetStoreConfigDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomer(\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $password: String!\n  ) {\n    createCustomerV2(\n      input: {\n        firstname: $firstname\n        lastname: $lastname\n        email: $email\n        password: $password\n      }\n    ) {\n      customer {\n        firstname\n        lastname\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomer(\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $password: String!\n  ) {\n    createCustomerV2(\n      input: {\n        firstname: $firstname\n        lastname: $lastname\n        email: $email\n        password: $password\n      }\n    ) {\n      customer {\n        firstname\n        lastname\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {\n    recaptchaFormConfig(formType: $formType) {\n      __typename\n      is_enabled\n      configurations {\n        __typename\n        website_key\n        badge_position\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecaptchaConfig($formType: ReCaptchaFormEnum!) {\n    recaptchaFormConfig(formType: $formType) {\n      __typename\n      is_enabled\n      configurations {\n        __typename\n        website_key\n        badge_position\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStoreConfig {\n    storeConfig {\n      store_code\n      store_name\n      header_logo_src\n      logo_alt\n      default_display_currency_code\n    }\n    availableStores {\n      store_code\n      store_name\n      is_default_store\n    }\n    currency {\n      available_currency_codes\n      default_display_currency_code\n    }\n  }\n"): (typeof documents)["\n  query GetStoreConfig {\n    storeConfig {\n      store_code\n      store_name\n      header_logo_src\n      logo_alt\n      default_display_currency_code\n    }\n    availableStores {\n      store_code\n      store_name\n      is_default_store\n    }\n    currency {\n      available_currency_codes\n      default_display_currency_code\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;