// src/usuario/dto/update-user.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean } from 'class-validator';

// DTO para edición de perfil (datos básicos del usuario)
export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsOptional()
  @IsString()
  primer_nombre?: string;

  @IsOptional()
  @IsString()
  segundo_nombre?: string;

  @IsOptional()
  @IsString()
  primer_apellido?: string;

  @IsOptional()
  @IsString()
  segundo_apellido?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

// DTO para edición administrativa (puede modificar todo)
export class UpdateUserAdminDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsOptional()
  @IsString()
  primer_nombre?: string;

  @IsOptional()
  @IsString()
  segundo_nombre?: string;

  @IsOptional()
  @IsString()
  primer_apellido?: string;

  @IsOptional()
  @IsString()
  segundo_apellido?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  rolNombre?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsString()
  username?: string;
}

// DTO para cambio de contraseña
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  password_actual: string;

  @IsString()
  @IsNotEmpty()
  password_nuevo: string;
} 