import { Module } from "@nestjs/common";
import { UsersService } from "./user.service.js";
import { UsersController } from "./user.controller.js";
import { UserRepository } from "./user.repository.js";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
