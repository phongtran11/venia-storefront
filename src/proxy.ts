import { requestLoggerProxy, sequenceProxy } from "@/lib/proxy";

export const proxy = sequenceProxy([]);

export const config = {
  matcher: [
    "/((?!.well-known|favicon.ico|api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
