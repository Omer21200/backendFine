import { IsString, IsNotEmpty, IsInt, Min, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class CreateAulaDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  piso: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsOptional()
  @IsBoolean()
  para_ninos?: boolean;

  @IsOptional()
  @IsObject()
  equipamiento?: Record<string, any>;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateAulaDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  piso?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacidad?: number;

  @IsOptional()
  @IsBoolean()
  para_ninos?: boolean;

  @IsOptional()
  @IsObject()
  equipamiento?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;
} 