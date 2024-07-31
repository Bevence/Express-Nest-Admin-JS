import logger from "./utils/logger.js";
import { APP_CONFIG } from "./config/env.config.js";
import app from "./app.js";

app
  .listen(APP_CONFIG.PORT, () => {
    logger.info(`server running on ${APP_CONFIG.PORT}`);
  })
  .on("error", (e) => logger.error(e));
