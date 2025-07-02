import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { CreateUserDto } from './dto/create-user.dto';
import { handleSupabaseError } from '../utils/supabase-error-handler';

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/ñ/g, 'n')
    .replace(/Ñ/g, 'N')
    .replace(/[^a-zA-Z0-9]/g, ''); // elimina otros caracteres especiales
}

@Injectable()
export class UsuarioService {
  async crearUsuario(dto: CreateUserDto) {
    let personaIdCreada: string | null = null;

    try {
      const {
        rolNombre,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        cedula,
        correo,
        telefono,
        password,
      } = dto;

      // Buscar rol existente (no se crea)
      const { data: rolData, error: rolError } = await supabase
        .from('rol')
        .select('id')
        .eq('nombre', rolNombre)
        .maybeSingle();

      if (rolError) {
        handleSupabaseError(rolError, 'Rol');
        throw new Error('Error al buscar el rol');
      }

      if (!rolData) {
        throw new Error(`Rol "${rolNombre}" no existe`);
      }

      const rolId = rolData.id;

      // Insertar persona
      const { data: personaData, error: personaError } = await supabase
        .from('persona')
        .insert([
          {
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            cedula,
            correo,
            telefono,
          },
        ])
        .select('id')
        .single();

      if (personaError) {
        handleSupabaseError(personaError, 'Persona');
      }

      if (!personaData) {
        throw new Error('No se pudo crear la persona');
      }

      personaIdCreada = personaData.id;

      // Generar username único y normalizado
      const inicial1 = normalizeText(primer_nombre[0] || '');
      const inicial2 = normalizeText(segundo_nombre?.[0] || '');
      const apellido = normalizeText(primer_apellido);
      let username = `${inicial1}${inicial2}${apellido}`.toLowerCase();
      const base = username;
      let i = 1;

      while (true) {
        const { data: exists } = await supabase
          .from('usuario')
          .select('uid')
          .eq('username', username)
          .maybeSingle();
        if (!exists) break;
        username = `${base}${i++}`;
      }

      // Insertar usuario
      const { error: userError } = await supabase
        .from('usuario')
        .insert([
          {
            username,
            password,
            persona_id: personaIdCreada,
            rol_id: rolId,
          },
        ]);

      if (userError) {
        // Eliminar persona si falla usuario
        await supabase.from('persona').delete().eq('id', personaIdCreada);
        handleSupabaseError(userError, 'Usuario');
      }

      return { message: 'Usuario creado', username };
    } catch (error) {
      if (personaIdCreada) {
        await supabase.from('persona').delete().eq('id', personaIdCreada);
      }
      handleSupabaseError(error, 'Creación de usuario');
    }
  }
}
