// import { getModelByName } from "@adminjs/prisma";
// import uploadFileFeature from "@adminjs/upload";
// import { Prisma } from "@prisma/client";

// import {
//   getDefaultImageValidation,
//   getLocalProvider,
//   getUploadPath,
//   getUploadProperties,
//   sortBy,
// } from "../backend/helpers/index.js";
// import {
//   imageValidation,
//   servicePayloadValidation,
// } from "../backend/hooks/index.js";
// import componentLoader, { IMAGE_THUMBNAIL } from "../components.bundler.js";
// import { prismaClient } from "../prisma.config.js";
// import { useEnvironmentVariableToDisableActions } from "../features/useEnvironmentVariableToDisableActions.js";
// import { menu } from "../admin.config.js";
// import { ResourceFunction } from "../types/index.js";

// export const ServiceResource: ResourceFunction<{
//   model: Prisma.MemberDelegate;
//   client: typeof prismaClient;
// }> = () => ({
//   resource: { model: getModelByName("Service"), client: prismaClient },
//   options: {
//     navigation: menu.services,
//     actions: {
//       new: {
//         before: [
//           servicePayloadValidation,
//           imageValidation("logo"),
//           imageValidation("image"),
//         ],
//       },
//       edit: {
//         before: [
//           servicePayloadValidation,
//           imageValidation("logo"),
//           imageValidation("image"),
//         ],
//       },
//       show: {
//         showInDrawer: true,
//       },
//     },
//     sort: sortBy("order", "asc"),
//     properties: {
//       id: {
//         isId: true,
//         isVisible: {
//           show: false,
//         },
//       },
//       description: {
//         type: "richtext",
//       },
//       shortDescription: {
//         type: "textarea",
//       },
//       order: {
//         type: "number",
//       },
//       logo: {
//         components: {
//           list: IMAGE_THUMBNAIL,
//         },
//       },
//     },
//     listProperties: ["title", "logo", "createdAt", "updatedAt"],
//     editProperties: [
//       "title",
//       "logo",
//       "logoAlternativeText",
//       "shortDescription",
//       "order",
//       "description",
//       "image",
//       "imageAlternativeText",
//     ],
//     filterProperties: ["title", "createdAt", "updatedAt"],
//   },

//   features: [
//     useEnvironmentVariableToDisableActions(),
//     uploadFileFeature({
//       componentLoader,
//       provider: getLocalProvider,
//       uploadPath: getUploadPath("service/logo"),
//       properties: getUploadProperties("logo"),
//       validation: getDefaultImageValidation,
//     }),
//     uploadFileFeature({
//       componentLoader,
//       provider: getLocalProvider,
//       uploadPath: getUploadPath("service/images"),
//       properties: getUploadProperties("image"),
//       validation: getDefaultImageValidation,
//     }),
//   ],
// });
