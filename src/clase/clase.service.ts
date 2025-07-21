import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { CreateClaseDto, UpdateClaseDto } from './dto/create-clase.dto';
import { handleSupabaseError } from '../utils/supabase-error-handler';

@Injectable()
export class ClaseService {
  async crearClase(dto: CreateClaseDto) {
    const { data, error } = await supabase
      .from('clase')
      .insert([{
        programa_id: dto.programa_id,
        cupos_proyectados: dto.cupos_proyectados,
        horario_solicitado: dto.horario_solicitado,
        paralelo: dto.paralelo,
        estado: dto.estado || 'PENDIENTE',
        prioridad: dto.prioridad || 5,
        observaciones: dto.observaciones
      }])
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .single();

    if (error) {
      handleSupabaseError(error, 'Crear clase');
    }

    return {
      success: true,
      message: 'Clase creada correctamente',
      clase: data
    };
  }

  async listarClases() {
    const { data, error } = await supabase
      .from('clase')
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'Listar clases');
    }

    return {
      success: true,
      clases: data
    };
  }

  async listarClasesPorEstado(estado: string) {
    const { data, error } = await supabase
      .from('clase')
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .eq('estado', estado)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'Listar clases por estado');
    }

    return {
      success: true,
      clases: data
    };
  }

  async listarClasesPorPrograma(programaId: string) {
    const { data, error } = await supabase
      .from('clase')
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .eq('programa_id', programaId)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'Listar clases por programa');
    }

    return {
      success: true,
      clases: data
    };
  }

  async obtenerClasePorId(id: string) {
    const { data, error } = await supabase
      .from('clase')
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      handleSupabaseError(error, 'Obtener clase');
    }

    if (!data) {
      throw new Error('Clase no encontrada');
    }

    return {
      success: true,
      clase: data
    };
  }

  async actualizarClase(dto: UpdateClaseDto) {
    const { id, ...datosActualizar } = dto;

    // Verificar que la clase existe
    await this.obtenerClasePorId(id);

    const { data, error } = await supabase
      .from('clase')
      .update(datosActualizar)
      .eq('id', id)
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .single();

    if (error) {
      handleSupabaseError(error, 'Actualizar clase');
    }

    return {
      success: true,
      message: 'Clase actualizada correctamente',
      clase: data
    };
  }

  async cambiarEstado(id: string, estado: string) {
    const { data, error } = await supabase
      .from('clase')
      .update({ estado })
      .eq('id', id)
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .single();

    if (error) {
      handleSupabaseError(error, 'Cambiar estado de clase');
    }

    return {
      success: true,
      message: `Estado de clase cambiado a ${estado}`,
      clase: data
    };
  }

  async cambiarPrioridad(id: string, prioridad: number) {
    if (prioridad < 1 || prioridad > 10) {
      throw new Error('La prioridad debe estar entre 1 y 10');
    }

    const { data, error } = await supabase
      .from('clase')
      .update({ prioridad })
      .eq('id', id)
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .single();

    if (error) {
      handleSupabaseError(error, 'Cambiar prioridad de clase');
    }

    return {
      success: true,
      message: `Prioridad de clase cambiada a ${prioridad}`,
      clase: data
    };
  }

  async eliminarClase(id: string) {
    // Verificar que la clase existe
    await this.obtenerClasePorId(id);

    const { error } = await supabase
      .from('clase')
      .delete()
      .eq('id', id);

    if (error) {
      handleSupabaseError(error, 'Eliminar clase');
    }

    return {
      success: true,
      message: 'Clase eliminada correctamente'
    };
  }

  async obtenerClasesPorPrioridad(minPrioridad: number, maxPrioridad: number) {
    const { data, error } = await supabase
      .from('clase')
      .select(`
        *,
        programa:programa_id (
          id,
          nombre,
          categoria
        )
      `)
      .gte('prioridad', minPrioridad)
      .lte('prioridad', maxPrioridad)
      .order('prioridad', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'Obtener clases por prioridad');
    }

    return {
      success: true,
      clases: data
    };
  }
} 