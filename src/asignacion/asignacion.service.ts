import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class AsignacionService {
  async resetearAmbiente() {
    const { error } = await supabase.rpc('resetear_ambiente_asignacion', {});
    if (error) throw new Error('Error al resetear ambiente: ' + error.message);
    return { success: true, message: 'Ambiente reseteado correctamente' };
  }

  async generarAsignacion() {
    const { data, error } = await supabase.rpc('generar_asignacion', {});
    if (error) throw new Error('Error al generar asignación: ' + error.message);
    return { success: true, resultado: data };
  }
} 