import { userRepository } from "./user.repository.js";

const getUsers = async () => {
  return userRepository.getUsers();
};

export const userService = { getUsers };
