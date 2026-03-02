import { ApolloLink, HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { getCookie } from "@/lib/cookie";
import { logger } from "../logger";
import { tap } from "rxjs";

const loggerLink = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation;

  return forward(operation).pipe(
    tap((data) => {
      logger.info(
        data,
        `[Apollo RSC] ${operationName} : ${JSON.stringify(variables)}`,
      );
    }),
  );
});

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const [store, currency] = await Promise.all([
      getCookie("store"),
      getCookie("currency"),
    ]);

    const headers: Record<string, string> = {};
    if (store) headers["Store"] = store || "default";
    if (currency) headers["Content-Currency"] = currency || "USD";

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        loggerLink,
        new HttpLink({
          uri: process.env.MAGENTO_BE_API!,
          headers,
          fetchOptions: {
            cache: "no-cache",
          },
        }),
      ]),
    });
  },
);
