import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { CreateAulaDto, UpdateAulaDto } from './dto/create-aula.dto';
import { handleSupabaseError } from '../utils/supabase-error-handler';

@Injectable()
export class AulaService {
  async crearAula(dto: CreateAulaDto) {
    const { data, error } = await supabase
      .from('aula')
      .insert([{
        numero: dto.numero,
        piso: dto.piso,
        capacidad: dto.capacidad,
        tipo_aula: dto.tipo_aula,
        edad_minima: dto.edad_minima,
        edad_maxima: dto.edad_maxima,
        ubicacion: dto.ubicacion,
        observaciones: dto.observaciones
      }])
      .select()
      .single();

    if (error) {
      handleSupabaseError(error, 'Crear aula');
    }

    return {
      success: true,
      message: 'Aula creada correctamente',
      aula: data
    };
  }

  async listarAulas() {
    const { data, error } = await supabase
      .from('aula')
      .select('*')
      .eq('estado', true)
      .order('numero', { ascending: true });

    if (error) {
      handleSupabaseError(error, 'Listar aulas');
    }

    return {
      success: true,
      aulas: data
    };
  }

  async obtenerAulaPorId(id: string) {
    const { data, error } = await supabase
      .from('aula')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      handleSupabaseError(error, 'Obtener aula');
    }

    if (!data) {
      throw new Error('Aula no encontrada');
    }

    return {
      success: true,
      aula: data
    };
  }

  async actualizarAula(dto: UpdateAulaDto) {
    const { id, ...datosActualizar } = dto;

    // Verificar que el aula existe
    await this.obtenerAulaPorId(id);

    const { data, error } = await supabase
      .from('aula')
      .update(datosActualizar)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      handleSupabaseError(error, 'Actualizar aula');
    }

    return {
      success: true,
      message: 'Aula actualizada correctamente'
    };
  }

  async eliminarAula(id: string) {
    // Verificar que el aula existe
    await this.obtenerAulaPorId(id);

    const { error } = await supabase
      .from('aula')
      .update({ estado: false })
      .eq('id', id);

    if (error) {
      handleSupabaseError(error, 'Eliminar aula');
    }

    return {
      success: true,
      message: 'Aula eliminada correctamente'
    };
  }

  async listarAulasDisponibles() {
    const { data, error } = await supabase
      .from('aula')
      .select('*')
      .eq('disponible', true)
      .eq('estado', true)
      .order('numero', { ascending: true });

    if (error) {
      handleSupabaseError(error, 'Listar aulas disponibles');
    }

    return {
      success: true,
      aulas: data
    };
  }

  async listarAulasPorPiso(piso: string) {
    const { data, error } = await supabase
      .from('aula')
      .select('*')
      .eq('piso', piso)
      .eq('estado', true)
      .order('numero', { ascending: true });

    if (error) {
      handleSupabaseError(error, 'Listar aulas por piso');
    }

    return {
      success: true,
      aulas: data
    };
  }

  async cambiarDisponibilidad(id: string, disponible: boolean) {
    const { data, error } = await supabase
      .from('aula')
      .update({ disponible })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      handleSupabaseError(error, 'Cambiar disponibilidad de aula');
    }

    return {
      success: true,
      message: `Aula ${disponible ? 'disponible' : 'no disponible'}`,
      aula: data
    };
  }

  async listarAulasEliminadas() {
    const { data, error } = await supabase
      .from('aula')
      .select('*')
      .eq('estado', false)
      .order('numero', { ascending: true });

    if (error) {
      handleSupabaseError(error, 'Listar aulas eliminadas');
    }

    return {
      success: true,
      aulas: data
    };
  }

  async restaurarAula(id: string) {
    // Verificar que el aula existe (incluyendo las eliminadas)
    const { data: aula, error: errorBuscar } = await supabase
      .from('aula')
      .select('*')
      .eq('id', id)
      .single();

    if (errorBuscar || !aula) {
      throw new Error('Aula no encontrada');
    }

    const { error } = await supabase
      .from('aula')
      .update({ estado: true })
      .eq('id', id);

    if (error) {
      handleSupabaseError(error, 'Restaurar aula');
    }

    return {
      success: true,
      message: 'Aula restaurada correctamente'
    };
  }

  async eliminarAulaDefinitivamente(id: string) {
    // Verificar que el aula existe
    await this.obtenerAulaPorId(id);

    const { error } = await supabase
      .from('aula')
      .delete()
      .eq('id', id);

    if (error) {
      handleSupabaseError(error, 'Eliminar aula definitivamente');
    }

    return {
      success: true,
      message: 'Aula eliminada definitivamente'
    };
  }
}
