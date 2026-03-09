import { ApolloLink, HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { logger } from "../logger";
import { tap } from "rxjs";

const loggerLink = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation;
  const startTime = performance.now();

  return forward(operation).pipe(
    tap({
      next: (result) => {
        const duration = performance.now() - startTime;

        logger.info(
          {
            variables,
            startTime,
            duration: `${duration}ms`,
            hasErrors: !!result.errors?.length,
            errors: result.errors,
          },
          `[Apollo RSC] ${operationName}`,
        );
      },
      error: (error) => {
        const duration = performance.now() - startTime;
        logger.error(
          { variables, duration: `${duration}ms`, error: error.message },
          `[Apollo RSC] ${operationName} FAILED`,
        );
      },
    }),
  );
});

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        loggerLink,
        new HttpLink({
          uri: process.env.MAGENTO_BE_API!,
        }),
      ]),
    });
  },
);
