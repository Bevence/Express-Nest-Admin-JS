import { INestApplication } from "@nestjs/common";
import AdminJS from "adminjs";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

import { generateAdminJSConfig } from "./admin.config.js";
import { expressAuthenticatedRouter } from "./admin.router.js";

export const setupAdminJS = async (app: INestApplication): Promise<void> => {
  const expressApp: AbstractHttpAdapter = app.get(HttpAdapterHost).httpAdapter;
  const config = generateAdminJSConfig();
  const adminJS = new AdminJS(config);

  const router = expressAuthenticatedRouter(adminJS);

  router.put("/me", (request, response) => {
    const body = (request as any).fields ?? {};
    const admin = { ...((request.session as any).adminUser ?? {}) };

    let sessionUpdated = false;
    if (body.theme) {
      admin.theme = body.theme;

      (request.session as any).adminUser = admin;
      request.session.save();
      sessionUpdated = true;
    }

    return response.send({
      session: admin,
      updated: sessionUpdated,
    });
  });

  expressApp.use(adminJS.options.rootPath, router);

  if (process.env.NODE_ENV === "development") adminJS.watch();
};
