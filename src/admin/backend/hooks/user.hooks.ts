import { ActionRequest, ValidationError } from "adminjs";

import { validateUserPayload } from "../validations/index.js";

export const userPayloadValidation = async (
  request: ActionRequest
): Promise<ActionRequest> => {
  const { payload, method } = request;

  if (payload && method === "post") {
    try {
      await validateUserPayload(payload);
      return request;
    } catch (error) {
      const detailError = {};
      error?.details?.forEach((d) => {
        detailError[d.path.join(".")] = { message: d.message };
      });
      throw new ValidationError(detailError);
    }
  }

  return request;
};
