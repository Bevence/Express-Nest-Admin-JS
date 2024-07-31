import { getModelByName } from "@adminjs/prisma";
import { Prisma } from "@prisma/client";

import { ResourceFunction } from "../types/index.js";
import { prismaClient } from "../prisma.config.js";
import { menu } from "../admin.config.js";
import { sortBy } from "../backend/helpers/index.js";
import { userPayloadValidation } from "../backend/hooks/index.js";

export const userResource: ResourceFunction<{
  model: Prisma.UserDelegate;
  client: typeof prismaClient;
}> = () => ({
  resource: { model: getModelByName("User"), client: prismaClient },
  options: {
    navigation: menu.user,
    actions: {
      show: { showInDrawer: true },
      new: {
        before: [userPayloadValidation],
      },
      edit: {
        before: [userPayloadValidation],
      },
    },
    sort: sortBy("createdAt", "desc"),
    properties: {
      password: {
        type: "password",
      },
    },
    listProperties: ["email", "role", "createdAt"],
  },

  // features: [
  // useEnvironmentVariableToDisableActions(),
  // uploadFileFeature({
  //   componentLoader,
  //   provider: getLocalProvider,
  //   uploadPath: getUploadPath("users"),
  //   properties: getUploadProperties("image"),
  //   validation: getDefaultImageValidation,
  // }),
  // ],
});
