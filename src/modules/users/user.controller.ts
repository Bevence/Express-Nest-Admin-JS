import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./user.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { USER_SUCCESS_CONSTANT } from "./user.constant.js";
import { QueryUserDto } from "./dto/query-user.dto.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: USER_SUCCESS_CONSTANT.USER_CREATED,
      data,
    };
  }

  @Get()
  async findUsers(@Query() query: QueryUserDto) {
    const [data, totalCount] = await this.usersService.findUsers(query);

    return {
      success: true,
      message: USER_SUCCESS_CONSTANT.USER_LIST_FETCHED,
      data,
      totalCount,
    };
  }

  @Get(":id")
  async findUser(@Param("id") id: string) {
    const data = await this.usersService.findUserById(id);

    return {
      success: true,
      message: USER_SUCCESS_CONSTANT.USER_FETCHED,
      data,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);

    return {
      success: true,
      message: USER_SUCCESS_CONSTANT.USER_UPDATED,
      data,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.usersService.remove(id);

    return {
      success: true,
      message: USER_SUCCESS_CONSTANT.USER_DELETED,
    };
  }
}
