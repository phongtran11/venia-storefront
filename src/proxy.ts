import { requestLoggerProxy, sequenceProxy } from '@/lib/proxy';


export const proxy = sequenceProxy([requestLoggerProxy])

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}