import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { UserRepository } from "./user.repository.js";
import { USER_FAILURE_CONSTANT } from "./user.constant.js";
import { QueryUserDto } from "./dto/query-user.dto.js";
import { Prisma } from "@prisma/client";
import { constructPagination } from "../../utils/index.js";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  private constructWhereQuery(query: QueryUserDto) {
    let whereQuery: Prisma.UserWhereInput = {};

    if (query.keyword) {
      whereQuery = {
        email: {
          contains: query.keyword,
          mode: "insensitive",
        },
      };
    }

    return whereQuery;
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.checkUserExists({
      email: createUserDto.email,
    });
    if (userExists)
      throw new ConflictException(USER_FAILURE_CONSTANT.USER_ALREADY_EXISTS);

    return this.userRepository.create(createUserDto);
  }

  findUsers(query: QueryUserDto) {
    const { skip, take } = constructPagination(query);
    const whereQuery = this.constructWhereQuery(query);

    return this.userRepository.findUsers(whereQuery, skip, take);
  }

  findUserById(id: string) {
    return this.userRepository.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExistsById = await this.userRepository.checkUserExists({
      id,
    });
    if (!userExistsById)
      throw new NotFoundException(USER_FAILURE_CONSTANT.USER_NOT_FOUND);

    if (updateUserDto.email) {
      const userExistsByEmail = await this.userRepository.checkUserExists({
        email: updateUserDto.email,
        NOT: {
          id,
        },
      });
      if (userExistsByEmail)
        throw new NotFoundException(USER_FAILURE_CONSTANT.USER_ALREADY_EXISTS);
    }

    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
