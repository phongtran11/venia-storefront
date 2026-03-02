import { HttpLink } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { getCookie } from "@/lib/cookie";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
    const [store, currency] = await Promise.all([
        getCookie("store"),
        getCookie("currency")
    ])

    const headers: Record<string, string> = {}
    if (store) headers["Store"] = store || 'default'
    if (currency) headers["Content-Currency"] = currency || 'USD'

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.MAGENTO_BE_API!,
            headers,
            fetchOptions: {
                cache: 'no-cache'
            },
        }),
    });
});
