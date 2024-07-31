import { ROLE } from "@prisma/client";
import { prismaClient } from "./prisma.config.js";
import * as bcrypt from "bcrypt";

export const authenticateUser = async (email: string, password: string) => {
  try {
    const admin = await prismaClient.user.findUnique({
      where: {
        email,
        role: ROLE.ADMIN,
      },
    });
    console.log("admin :>> ", admin);
    if (admin) {
      const validPassword = await bcrypt.compare(password, admin.password);
      console.log("validPassword :>> ", validPassword);
      if (validPassword) {
        return admin;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
