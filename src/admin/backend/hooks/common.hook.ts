import { ActionRequest, AppError } from "adminjs";

export const imageValidation =
  (imageField = "image") =>
  (request): ActionRequest => {
    const { payload, method, files, fields } = request;

    if (payload && method === "post") {
      if (files && Object.keys(files).length) {
        const imageKeys = Object.keys(files).map((d) => d.split(".")[0]);
        if (imageKeys.includes(imageField)) return request;
      } else {
        if (fields[`${imageField}.path`]) return request;
      }
      throw new AppError(`${imageField} is required`);
    }

    return request;
  };

export const slugifyTitle = (request): ActionRequest => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const { title } = payload;
    payload.slug =
      title &&
      title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
  }

  return request;
};
