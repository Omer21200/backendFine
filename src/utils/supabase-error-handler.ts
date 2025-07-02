import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleSupabaseError(error: any, contexto = 'Operación') {
  if (!error) return;

  // Error por clave duplicada
  if (error.code === '23505') {
    const msg = error.message || '';
    if (msg.includes('cedula')) {
      throw new ConflictException(`${contexto}: La cédula ya está en uso.`);
    }
    if (msg.includes('correo')) {
      throw new ConflictException(`${contexto}: El correo ya está registrado.`);
    }
    if (msg.includes('telefono')) {
      throw new ConflictException(`${contexto}: El teléfono ya existe.`);
    }
    if (msg.includes('username')) {
      throw new ConflictException(`${contexto}: El nombre de usuario está ocupado.`);
    }
    throw new ConflictException(`${contexto}: Valor duplicado en campo único.`);
  }

  if (error.message) {
    throw new BadRequestException(`${contexto}: ${error.message}`);
  }

  throw new InternalServerErrorException(`Error inesperado en ${contexto}`);
}
