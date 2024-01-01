import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class UserDTO{
  @IsNotEmpty()  
  @IsString()
  readonly  name:string;
  @IsNotEmpty()
  @IsString()
  readonly username:string;
  @IsNotEmpty()
  @IsEmail()
  readonly  email:string;
  @IsNotEmpty()
  @IsString()
  readonly  password:string;
}