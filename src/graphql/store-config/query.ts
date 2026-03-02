import { graphql } from "@/gql"

export const GET_STORE_CONFIG = graphql(`
    query GetStoreConfig {
        storeConfig {
            store_code
            store_name
            header_logo_src
            logo_alt
            default_display_currency_code
        }
        availableStores {
            store_code
            store_name
            is_default_store
        }
        currency {
            available_currency_codes
            default_display_currency_code
        }
    }
`)

