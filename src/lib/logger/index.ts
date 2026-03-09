import pino, { Logger } from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger: Logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: isProduction
    ? undefined
    : {
        targets: [
          {
            target: "pino/file",
            options: {
              destination: "/tmp/venia-storefront.log",
              mkdir: true,
            },
          },
          {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        ],
      },
});
