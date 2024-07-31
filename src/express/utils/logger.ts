import { createLogger, transports, format } from "winston";

export default createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});
