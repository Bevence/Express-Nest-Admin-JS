import prismaClient from "../../config/db.config.js";

const getUsers = async () => {
  const [data, totalCount] = await prismaClient.$transaction([
    prismaClient.user.findMany(),
    prismaClient.user.count(),
  ]);

  return {
    data,
    totalCount,
  };
};

export const userRepository = { getUsers };
