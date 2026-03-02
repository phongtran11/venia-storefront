import { NextRequest, NextResponse } from "next/server";

export type Proxy = (request: NextRequest, response: NextResponse) => Promise<NextResponse>;

export function sequenceProxy(proxies: Proxy[]) {
    return (request: NextRequest) => {
        const response = NextResponse.next();
        return proxies.reduce(async (prev, proxy) => {
            const prevResponse = await prev;
            return proxy(request, prevResponse);
        }, Promise.resolve(response));
    }
}