import { SeqTransport } from "@datalust/winston-seq";
import winston from "winston";

const seqServerUrlEnv = "SEQ_SERVER_URL";
const seqServerUrl = Bun.env[seqServerUrlEnv] ?? "";
const seqApiKeyEnv = "SEQ_API_KEY";
const seqApiKey = Bun.env[seqApiKeyEnv] ?? "";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: {
    application: "goal",
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new SeqTransport({
      serverUrl: seqServerUrl,
      apiKey: seqApiKey,
      onError: (e) => {
        console.error(e);
      },
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});
