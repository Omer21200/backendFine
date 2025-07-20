import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class ProgramasService {
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('programa')
      .select('id, nombre')
      .order('id', { ascending: true });

    if (error || !data) {
      throw new Error('Error al obtener programas: ' + (error?.message ?? 'Sin datos'));
    }

    return {
      success: true,
      programas: data,
    };
  }

  async crearPrograma(nombre: string) {
    const { data, error } = await supabase
      .from('programa')
      .insert([{ nombre }]);

    if (error || !data) {
      throw new Error('Error al insertar programa: ' + (error?.message ?? 'Sin datos'));
    }

    return {
      success: true,
      programaCreado: data[0],
    };
  }
}
