import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateClaseDto {
  @IsUUID()
  @IsNotEmpty()
  programa_id: string;

  @IsInt()
  @Min(1)
  cupos_proyectados: number;

  @IsOptional()
  @IsString()
  horario_solicitado?: string;

  @IsOptional()
  @IsString()
  paralelo?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  prioridad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateClaseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsUUID()
  programa_id?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cupos_proyectados?: number;

  @IsOptional()
  @IsString()
  horario_solicitado?: string;

  @IsOptional()
  @IsString()
  paralelo?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  prioridad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
} 