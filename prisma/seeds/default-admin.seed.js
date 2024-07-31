import { PrismaClient, ROLE } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

async function seedDefaultAdmin() {
  try {
    await prismaClient.user.create({
      data: {
        email: "primary@admin.com",
        password: await bcrypt.hash("Admin#@321", 10),
        role: ROLE.ADMIN,
      },
    });
    console.log("Default admin migrated successfully");
  } catch (error) {
    console.log("Something went wrong while creating default admin");
  }
}

export { seedDefaultAdmin };
