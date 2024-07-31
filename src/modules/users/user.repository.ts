import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto.js";
import { PrismaService } from "../../prisma/prisma.service.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateUserDto) {
    return this.prismaService.user.create({
      data: payload,
    });
  }

  checkUserExists(whereQuery: Prisma.UserWhereInput) {
    return this.prismaService.user.count({
      where: whereQuery,
    });
  }

  findUsers(whereQuery: Prisma.UserWhereInput, skip: number, take: number) {
    return this.prismaService.$transaction([
      this.prismaService.user.findMany({ where: whereQuery, skip, take }),
      this.prismaService.user.count({ where: whereQuery }),
    ]);
  }

  findUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  updateUser(id: string, payload: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: { id },
      data: payload,
    });
  }

  deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
