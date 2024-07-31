// Adapters
import {
  Database as PrismaDatabase,
  Resource as PrismaResource,
} from "@adminjs/prisma";
import { dark, light } from "@adminjs/themes";
import AdminJS, { AdminJSOptions, ResourceOptions } from "adminjs";

import componentLoader, { DASHBOARD } from "./components.bundler.js";
import { userResource } from "./resources/user.resources.js";

AdminJS.registerAdapter({ Database: PrismaDatabase, Resource: PrismaResource });

export const menu: Record<string, ResourceOptions["navigation"]> = {
  user: { name: "User", icon: "User" },
};

export const generateAdminJSConfig: () => AdminJSOptions = () => ({
  version: { admin: true, app: "2.0.0" },
  rootPath: "/admin",
  componentLoader,
  assets: {
    // styles: ['/custom.css'],
    scripts: process.env.NODE_ENV === "production" ? ["/gtm.js"] : [],
  },
  branding: {
    companyName: process.env.COMPANY_NAME,
    withMadeWithLove: false,
    // logo: "/logo.png",
    // favicon: "/logo.png",
    theme: {
      colors: { primary100: "#4D70EB" },
    },
  },
  dashboard: {
    component: DASHBOARD,
  },
  defaultTheme: "light",
  availableThemes: [light, dark],
  env: {
    APP_URL: process.env.APP_URL,
    APP_NAME: process.env.APP_NAME,
    STORYBOOK_URL: process.env.STORYBOOK_URL,
  },
  resources: [userResource()],
  locale: {
    language: "en",
    availableLanguages: ["en"],
    translations: {
      en: {
        labels: {
          // INFO: To change the labels across the application
          // About: "About Our Team",
        },
        properties: {
          // INFO: To change the properties field label across the application
          // "timeTable.weekdays": "Weekdays (eg. Sunday or Monday - Friday)",
        },
      },
    },
  },
});
