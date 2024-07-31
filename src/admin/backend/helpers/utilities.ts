export const slugify = (data: string) =>
  data.toLowerCase().split(" ").join("-");

export const isStringEmpty = (payload: string): boolean => {
  return !payload || /^\s*$/.test(payload);
};

export const isDescriptionEmpty = (payload: string): boolean => {
  return !payload || payload.replace(/<(.|\n)*?>/g, "").trim().length === 0;
};
