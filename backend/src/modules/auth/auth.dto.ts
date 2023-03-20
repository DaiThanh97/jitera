import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
  IsEmail,
} from 'class-validator';
import { LoginInput, SignUpInput } from '../../graphql';

export class LoginDto implements LoginInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(18)
  password: string;
}

export class SignUpDto implements SignUpInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(18)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak. Please try with special characters, numbers, capital letters',
  })
  password: string;

  @IsOptional()
  @IsString()
  nickname?: string;
}
