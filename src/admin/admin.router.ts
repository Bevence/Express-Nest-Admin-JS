import AdminJSExpress from "@adminjs/express";
import AdminJS from "adminjs";
import { Router } from "express";
import ConnectPgSimple from "connect-pg-simple";
import { prismaClient } from "./prisma.config.js";
import session from "express-session";
import { ROLE } from "@prisma/client";
import { authenticateUser } from "./admin.auth.js";

export const expressAuthenticatedRouter = (
  adminJs: AdminJS,
  router: Router | null = null
) => {
  const ConnectSession = ConnectPgSimple(session);

  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production",
    },
    tableName: "session",
    createTableIfMissing: true,
  });

  return AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: authenticateUser,
      cookieName: process.env.SESSION_NAME ?? "namuna_adminjs",
      cookiePassword: process.env.SESSION_SECRET ?? "namuna_sessionsecret",
    },
    router,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET ?? "namuna_sessionsecret",
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
      name: process.env.APP_NAME ?? "Namuna Admin",
    }
  );
};
