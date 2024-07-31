import express, { Request, Response, NextFunction } from "express";
import logger from "./utils/logger.js";
import cors from "cors";
import { APP_CONFIG } from "./config/env.config.js";
import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from "./utils/ApiError.js";
import routes from "./route.js";

process.on("uncaughtException", (e) => {
  logger.error(e);
});

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: APP_CONFIG.CORS_URL, optionsSuccessStatus: 200 }));

// // Routes
app.use("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.use(routes);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) =>
  next(new NotFoundError())
);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    logger.error(err);
    if (APP_CONFIG.NODE_ENV === "development") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
