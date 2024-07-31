import { IsNumberString, IsString } from "class-validator";

export class QueryUserDto {
  @IsNumberString()
  page?: string;

  @IsNumberString()
  pageSize?: string;

  @IsString()
  keyword?: string;
}
