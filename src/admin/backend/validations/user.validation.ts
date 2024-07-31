import { ROLE } from "@prisma/client";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string(),
  email: Joi.string().required(),
  role: Joi.string().valid(...Object.keys(ROLE)),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

export const validateUserPayload = (payload) =>
  schema.validateAsync(payload, {
    abortEarly: false,
  });
