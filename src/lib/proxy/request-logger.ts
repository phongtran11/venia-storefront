import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from '@/lib/logger';

export async function requestLoggerProxy(request: NextRequest, response: NextResponse) {
    const requestId = crypto.randomUUID();
    const start = Date.now();

    const duration = Date.now() - start;

    logger.info({
        id: requestId,
        method: request.method,
        path: request.nextUrl.pathname,
        status: response.status,
        duration: `${duration}ms`,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        ua: request.headers.get('user-agent') || 'unknown'
    }, 'Incoming Request');

    return response;
}
