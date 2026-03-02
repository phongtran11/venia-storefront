import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://venia.magento.com/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        avoidOptionals: true,
      },
    },
  },
  ignoreNoDocuments: true,
};
export default config;
