import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto, UpdateUserAdminDto, ChangePasswordDto } from './dto/update-user.dto';
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

  async obtenerTodosUsuarios() {
    const { data, error } = await supabase
      .from('usuario')
      .select(`
        uid,
        username,
        activo,
        rol:rol_id ( nombre ),
        persona:persona_id (
          id,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          cedula,
          correo,
          telefono
        )
      `);
    if (error) {
      handleSupabaseError(error, 'Obtener todos los usuarios');
    }
    return data;
  }

  async obtenerUsuarioPorId(uid: string) {
    const { data, error } = await supabase
      .from('usuario')
      .select(`
        uid,
        username,
        activo,
        rol:rol_id ( nombre ),
        persona:persona_id (
          id,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          cedula,
          correo,
          telefono
        )
      `)
      .eq('uid', uid)
      .single();

    if (error) {
      handleSupabaseError(error, 'Obtener usuario');
    }

    return data;
  }

  async actualizarUsuario(dto: UpdateUserDto) {
    const { uid, ...datosActualizar } = dto;

    try {
      // Obtener usuario actual
      const usuarioActual = await this.obtenerUsuarioPorId(uid);
      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Actualizar solo datos de persona
      const datosPersona: any = {};
      if (datosActualizar.primer_nombre) datosPersona.primer_nombre = datosActualizar.primer_nombre;
      if (datosActualizar.segundo_nombre !== undefined) datosPersona.segundo_nombre = datosActualizar.segundo_nombre;
      if (datosActualizar.primer_apellido) datosPersona.primer_apellido = datosActualizar.primer_apellido;
      if (datosActualizar.segundo_apellido !== undefined) datosPersona.segundo_apellido = datosActualizar.segundo_apellido;
      if (datosActualizar.cedula) datosPersona.cedula = datosActualizar.cedula;
      if (datosActualizar.correo) datosPersona.correo = datosActualizar.correo;
      if (datosActualizar.telefono !== undefined) datosPersona.telefono = datosActualizar.telefono;

      if (Object.keys(datosPersona).length > 0) {
        const { error: personaError } = await supabase
          .from('persona')
          .update(datosPersona)
          .eq('id', (usuarioActual.persona as any).id);

        if (personaError) {
          handleSupabaseError(personaError, 'Actualizar datos de persona');
        }
      }

      return { message: 'Datos de persona actualizados correctamente' };
    } catch (error) {
      handleSupabaseError(error, 'Actualizar datos de persona');
    }
  }

  async eliminarUsuario(uid: string) {
    try {
      // Verificar que el usuario existe
      const usuarioActual = await this.obtenerUsuarioPorId(uid);
      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar que el usuario no esté ya eliminado
      if (!usuarioActual.activo) {
        throw new Error('El usuario ya está eliminado');
      }

      // Cambiar el estado del usuario a inactivo (eliminación lógica)
      const { error } = await supabase
        .from('usuario')
        .update({ activo: false })
        .eq('uid', uid);

      if (error) {
        handleSupabaseError(error, 'Eliminar usuario');
      }

      return {
        success: true,
        message: 'Usuario eliminado correctamente',
        uid: uid
      };
    } catch (error) {
      handleSupabaseError(error, 'Eliminar usuario');
    }
  }

  async restaurarUsuario(uid: string) {
    try {
      // Verificar que el usuario existe
      const usuarioActual = await this.obtenerUsuarioPorId(uid);
      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar que el usuario esté eliminado
      if (usuarioActual.activo) {
        throw new Error('El usuario ya está activo');
      }

      // Cambiar el estado del usuario a activo
      const { error } = await supabase
        .from('usuario')
        .update({ activo: true })
        .eq('uid', uid);

      if (error) {
        handleSupabaseError(error, 'Restaurar usuario');
      }

      return {
        success: true,
        message: 'Usuario restaurado correctamente',
        uid: uid
      };
    } catch (error) {
      handleSupabaseError(error, 'Restaurar usuario');
    }
  }

  async obtenerUsuariosEliminados() {
    const { data, error } = await supabase
      .from('usuario')
      .select(`
        uid,
        username,
        activo,
        rol:rol_id ( nombre ),
        persona:persona_id (
          id,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          cedula,
          correo,
          telefono
        )
      `)
      .eq('activo', false);

    if (error) {
      handleSupabaseError(error, 'Obtener usuarios eliminados');
    }

    return {
      success: true,
      usuarios: data
    };
  }

  async actualizarPerfil(dto: UpdateProfileDto) {
    const { uid, ...datosActualizar } = dto;

    try {
      // Obtener usuario actual
      const usuarioActual = await this.obtenerUsuarioPorId(uid);
      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Separar datos de persona y usuario
      const datosPersona: any = {};
      const datosUsuario: any = {};

      // Datos de persona
      if (datosActualizar.primer_nombre) datosPersona.primer_nombre = datosActualizar.primer_nombre;
      if (datosActualizar.segundo_nombre !== undefined) datosPersona.segundo_nombre = datosActualizar.segundo_nombre;
      if (datosActualizar.primer_apellido) datosPersona.primer_apellido = datosActualizar.primer_apellido;
      if (datosActualizar.segundo_apellido !== undefined) datosPersona.segundo_apellido = datosActualizar.segundo_apellido;
      if (datosActualizar.cedula) datosPersona.cedula = datosActualizar.cedula;
      if (datosActualizar.correo) datosPersona.correo = datosActualizar.correo;
      if (datosActualizar.telefono !== undefined) datosPersona.telefono = datosActualizar.telefono;

      // Datos de usuario (solo password en perfil)
      if (datosActualizar.password) datosUsuario.password = datosActualizar.password;

      // Actualizar datos de persona si hay cambios
      if (Object.keys(datosPersona).length > 0) {
        const { error: personaError } = await supabase
          .from('persona')
          .update(datosPersona)
          .eq('id', (usuarioActual.persona as any).id);

        if (personaError) {
          handleSupabaseError(personaError, 'Actualizar datos de persona');
        }
      }

      // Actualizar datos de usuario si hay cambios
      if (Object.keys(datosUsuario).length > 0) {
        const { error: usuarioError } = await supabase
          .from('usuario')
          .update(datosUsuario)
          .eq('uid', uid);

        if (usuarioError) {
          handleSupabaseError(usuarioError, 'Actualizar datos de usuario');
        }
      }

      return {
        success: true,
        message: 'Perfil actualizado correctamente'
      };
    } catch (error) {
      handleSupabaseError(error, 'Actualizar perfil');
    }
  }

  async actualizarUsuarioAdmin(dto: UpdateUserAdminDto) {
    const { uid, ...datosActualizar } = dto;

    try {
      // Obtener usuario actual
      const usuarioActual = await this.obtenerUsuarioPorId(uid);
      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Separar datos de persona, usuario y rol
      const datosPersona: any = {};
      const datosUsuario: any = {};
      let rolId: string | null = null;

      // Datos de persona
      if (datosActualizar.primer_nombre) datosPersona.primer_nombre = datosActualizar.primer_nombre;
      if (datosActualizar.segundo_nombre !== undefined) datosPersona.segundo_nombre = datosActualizar.segundo_nombre;
      if (datosActualizar.primer_apellido) datosPersona.primer_apellido = datosActualizar.primer_apellido;
      if (datosActualizar.segundo_apellido !== undefined) datosPersona.segundo_apellido = datosActualizar.segundo_apellido;
      if (datosActualizar.cedula) datosPersona.cedula = datosActualizar.cedula;
      if (datosActualizar.correo) datosPersona.correo = datosActualizar.correo;
      if (datosActualizar.telefono !== undefined) datosPersona.telefono = datosActualizar.telefono;

      // Datos de usuario
      if (datosActualizar.password) datosUsuario.password = datosActualizar.password;
      if (datosActualizar.activo !== undefined) datosUsuario.activo = datosActualizar.activo;
      if (datosActualizar.username) datosUsuario.username = datosActualizar.username;

      // Buscar rol si se especifica
      if (datosActualizar.rolNombre) {
        const { data: rolData, error: rolError } = await supabase
          .from('rol')
          .select('id')
          .eq('nombre', datosActualizar.rolNombre)
          .maybeSingle();

        if (rolError) {
          handleSupabaseError(rolError, 'Buscar rol');
        }

        if (!rolData) {
          throw new Error(`Rol "${datosActualizar.rolNombre}" no existe`);
        }

        rolId = rolData.id;
        datosUsuario.rol_id = rolId;
      }

      // Actualizar datos de persona si hay cambios
      if (Object.keys(datosPersona).length > 0) {
        const { error: personaError } = await supabase
          .from('persona')
          .update(datosPersona)
          .eq('id', (usuarioActual.persona as any).id);

        if (personaError) {
          handleSupabaseError(personaError, 'Actualizar datos de persona');
        }
      }

      // Actualizar datos de usuario si hay cambios
      if (Object.keys(datosUsuario).length > 0) {
        const { error: usuarioError } = await supabase
          .from('usuario')
          .update(datosUsuario)
          .eq('uid', uid);

        if (usuarioError) {
          handleSupabaseError(usuarioError, 'Actualizar datos de usuario');
        }
      }

      return {
        success: true,
        message: 'Usuario actualizado correctamente por administrador'
      };
    } catch (error) {
      handleSupabaseError(error, 'Actualizar usuario por administrador');
    }
  }

  async cambiarPassword(dto: ChangePasswordDto) {
    const { uid, password_actual, password_nuevo } = dto;

    try {
      // Obtener usuario actual
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuario')
        .select('password')
        .eq('uid', uid)
        .single();

      if (usuarioError) {
        handleSupabaseError(usuarioError, 'Obtener usuario');
      }

      if (!usuarioData) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña actual
      if (usuarioData.password !== password_actual) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Actualizar contraseña
      const { error: updateError } = await supabase
        .from('usuario')
        .update({ password: password_nuevo })
        .eq('uid', uid);

      if (updateError) {
        handleSupabaseError(updateError, 'Cambiar contraseña');
      }

      return {
        success: true,
        message: 'Contraseña cambiada correctamente'
      };
    } catch (error) {
      handleSupabaseError(error, 'Cambiar contraseña');
    }
  }
}
