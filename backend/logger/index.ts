import path from "path";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.resolve("logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.resolve("logs", "warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.resolve("logs", "info.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.resolve("logs", "combined.log"),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}