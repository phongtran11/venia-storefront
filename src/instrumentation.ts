import { logger } from "@/lib/logger";

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        logger.info('Next.js Server Initialized with Pino');

        process.on('unhandledRejection', (reason, promise) => {
            logger.error({ promise, reason }, 'Unhandled Rejection at Promise');
        });

        process.on('uncaughtException', (err) => {
            logger.fatal(err, 'Uncaught Exception thrown');
            process.exit(1);
        });
    }
}