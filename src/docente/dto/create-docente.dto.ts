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

export class UpdateDocenteDto {
  @IsUUID() docente_id: string;
  @IsUUID() persona_id: string;

  @IsOptional() @IsString() primer_nombre?: string;
  @IsOptional() @IsString() segundo_nombre?: string;
  @IsOptional() @IsString() primer_apellido?: string;
  @IsOptional() @IsString() segundo_apellido?: string;
  @IsOptional() @IsString() cedula?: string;
  @IsOptional() @IsString() correo?: string;
  @IsOptional() @IsString() telefono?: string;

  @IsOptional() @IsUUID() tipo_contrato_id?: string;
  @IsOptional() @IsInt() experiencia_anios?: number;
  @IsOptional() @IsUUID() nivel_ingles_id?: string;
  @IsOptional() @IsInt() horas_disponibles?: number;

  @IsOptional() @IsArray() @IsUUID('all', { each: true }) especializaciones?: string[];
  @IsOptional() @IsArray() @IsUUID('all', { each: true }) horarios?: string[];
}
