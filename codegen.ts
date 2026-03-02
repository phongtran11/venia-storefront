import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:3000/api/proxy',
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/gql/': {
            preset: 'client',
        }
    },
    ignoreNoDocuments: true
}
export default config