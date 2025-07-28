import { IsString, IsNotEmpty, IsInt, Min, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class CreateAulaDto {
  @IsInt()
  @IsNotEmpty()
  numero: number;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsString()
  @IsNotEmpty()
  piso: string;

  @IsString()
  @IsNotEmpty()
  tipo_aula: string;

  @IsInt()
  @IsNotEmpty()
  edad_minima: number;

  @IsInt()
  @IsNotEmpty()
  edad_maxima: number;

  @IsInt()
  @Min(1)
  capacidad: number;



  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateAulaDto {
  @IsString()
  @IsNotEmpty()
  id: string; // uuid

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
  @IsString()
  created_at?: string;

  @IsOptional()
  @IsString()
  updated_at?: string;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  tipo_aula?: string;

  @IsOptional()
  @IsInt()
  edad_minima?: number;

  @IsOptional()
  @IsInt()
  edad_maxima?: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;
} 