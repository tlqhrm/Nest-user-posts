import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ReturnSignInDto {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
  token: string;
}
