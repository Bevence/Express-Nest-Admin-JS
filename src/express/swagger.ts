import { APP_CONFIG } from "./config/env.config.js";

export default {
  openapi: "3.0.1",
  info: {
    title: APP_CONFIG.APP_NAME,
    description: `Api documentation of <b>${APP_CONFIG.APP_NAME}</b>.`,
    version: "1.0.0",
  },
  servers: [
    {
      url: `${APP_CONFIG.APP_URL}/api/v1`,
      description: "Main Server v1",
    },
  ],
  tags: [
    {
      name: "User",
      description: "User Api",
    },
  ],
  paths: {
    "/user": {
      get: {
        tags: ["User"],
        summary: "user summary",
        description: "user description",
        operationId: "getUsers",
        requestBody: {},
        responses: {
          200: {
            description: "User list fetch",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserListResponse",
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFound",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      NotFound: {
        type: "object",
        example: {
          status: false,
          message: "Not Found",
        },
      },
      UserListResponse: {
        type: "object",
        example: {
          status: 200,
          message: "User list fetched successfully",
          data: [
            {
              id: "fce45cf5-4385-46ad-9314-1117ea95b22a",
              email: "primary@admin.com",
              password:
                "$2b$10$0uk3R03ia2.KApnbC4vonOn0Ev6ZDBcHJWWQWTkTRhz2dgxLdYNZm",
              role: "ADMIN",
              createdAt: "2024-07-30T17:48:23.466Z",
              updatedAt: "2024-07-30T17:48:23.466Z",
            },
          ],
          totalCount: 1,
        },
      },
    },
  },
};
