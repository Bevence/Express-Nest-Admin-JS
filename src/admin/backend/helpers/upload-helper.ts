import path from "path";
import { randomUUID } from "crypto";

export const getLocalProvider = {
  local: {
    bucket: process.env.NODE_ENV === "development" ? "public" : "build/public",
    opts: {
      baseUrl: process.env.APP_URL,
    },
  },
};

export const getUploadPath =
  (attribute: string) => (_record: any, file: string) => {
    const fileName = `${randomUUID()}-${Date.now()}`;
    const ext = path.extname(file);
    return `/${attribute}/${fileName}${ext}`;
  };

export const getRandomUploadPath =
  (attribute: string) => (record: any, file: string) => {
    const fileName = `${randomUUID()}-${Date.now()}`;
    const ext = path.extname(file);
    return `/${attribute}/${fileName}${ext}`;
  };

export const getUploadProperties = (attribute: string) => ({
  file: `${attribute}`,
  key: `${attribute}.key`,
  filename: `${attribute}.filename`,
  filePath: `${attribute}.path`,
  mimeType: `${attribute}.mine`,
  bucket: `${attribute}.bucket`,
  size: `${attribute}.size`,
  filesToDelete: `${attribute}.filesToDelete`,
});

export const getDefaultImageValidation = {
  maxSize: 5 * 1024 * 1024,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
};

export const getCustomFileValidation = (
  sizeInMB: number,
  mimeTypes: string[]
) => ({
  maxSize: sizeInMB * 1024 * 1024,
  mimeTypes,
});
