import { ApiProperty , PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength ,IsEnum} from 'class-validator';
import { UserRole } from '../entities/user.schema';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: UserRole, description: 'The role of the user' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'password123', })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}