import { ROLE } from "@prisma/client";
import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(ROLE)
  @IsString()
  role = ROLE.USER;
}
