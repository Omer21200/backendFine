import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  rolNombre: string;

  @IsString()
  @IsNotEmpty()
  primer_nombre: string;

  @IsString()
  @IsOptional()
  segundo_nombre?: string;

  @IsString()
  @IsNotEmpty()
  primer_apellido: string;

  @IsString()
  @IsOptional()
  segundo_apellido?: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
