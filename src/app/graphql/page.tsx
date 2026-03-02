'use client'

import { ApolloSandbox } from '@apollo/sandbox/react';

export default function GraphqlPage() {
    return (
        <ApolloSandbox className='h-screen' initialEndpoint='http://localhost:3000/api/proxy' />
    );
}

