import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class DashboardService {
  async obtenerEstadisticasDocentes() {
    // Usar la vista dashboard_stats para obtener estadísticas optimizadas
    const { data, error } = await supabase
      .from('dashboard_stats')
      .select('*')
      .single();

    if (error) {
      throw new Error('Error al obtener estadísticas de docentes: ' + (error as Error).message);
    }

    return {
      success: true,
      estadisticas: data
    };
  }

  async obtenerEstadisticasCompletas() {
    try {
      const estadisticasDocentes = await this.obtenerEstadisticasDocentes();
      
      // Aquí puedes agregar más estadísticas en el futuro
      // Por ejemplo: total de programas, usuarios activos, etc.
      
      return {
        success: true,
        dashboard: {
          docentes: estadisticasDocentes.estadisticas,
          // Agregar más estadísticas aquí cuando las necesites
        }
      };
    } catch (error) {
      throw new Error('Error al obtener estadísticas del dashboard: ' + error.message);
    }
  }
}
