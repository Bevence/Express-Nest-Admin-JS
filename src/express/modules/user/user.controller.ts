import { SuccessResponseList } from "../../utils/ApiResponse.js";
import { userService } from "./user.service.js";
import { USER_SUCCESS_CONSTANT } from "./user.constant.js";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  const { data, totalCount } = await userService.getUsers();

  return new SuccessResponseList(
    USER_SUCCESS_CONSTANT.USER_LIST_FETCH,
    data,
    totalCount
  ).send(res);
};

export const userController = { getUsers };
