import { IsString, IsNotEmpty, IsInt, Min, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class CreateAulaDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

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
  @IsBoolean()
  para_ninos?: boolean;


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