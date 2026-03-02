import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const mergedHeaders = await handleClientHeaders(request.headers);

    const response = await fetch(process.env.MAGENTO_BE_API!, {
      method: "POST",
      headers: mergedHeaders,
      body: JSON.stringify(body),
    });

    const resultCloned = response.clone();

    logger.info(
      await resultCloned.json(),
      `[Proxy] ${body.operationName} : ${JSON.stringify(body.variables)}`,
    );

    return response;
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleClientHeaders(headers: Headers) {
  const clientHeaders = await getClientHeaders(headers);
  const mergedHeaders = await mergeHeaders(clientHeaders);
  return mergedHeaders;
}

async function getClientHeaders(headers: Headers) {
  const clientHeaders = new Headers(headers);
  const headersToExclude = ["host", "connection", "content-length"];
  headersToExclude.forEach((header) => clientHeaders.delete(header));
  return clientHeaders;
}

async function mergeHeaders(headers: Headers) {
  const mergedHeaders = new Headers(headers);
  mergedHeaders.set("Content-Type", "application/json");

  return mergedHeaders;
}
