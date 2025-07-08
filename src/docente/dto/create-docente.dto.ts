import { IsUUID, IsInt, Min, IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  primer_nombre: string;

  @IsString()
  @IsOptional()
  segundo_nombre?: string;

  @IsString()
  primer_apellido: string;

  @IsString()
  @IsOptional()
  segundo_apellido?: string;

  @IsString()
  cedula: string;

  @IsString()
  correo: string;

  @IsString()
  telefono: string;

  @IsUUID()
  tipo_contrato_id: string;

  @IsInt()
  @Min(0)
  experiencia_anios: number;

  @IsUUID()
  nivel_ingles_id: string;

  @IsInt()
  @Min(0)
  horas_disponibles: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  especializaciones: string[];

  @IsArray()
@ArrayNotEmpty()
@IsUUID('all', { each: true })
horarios: string[];
}
