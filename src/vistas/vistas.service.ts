import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { handleSupabaseError } from '../utils/supabase-error-handler';

@Injectable()
export class VistasService {
  async obtenerVistaClasesAsignacion() {
    const { data, error } = await supabase
      .from('vista_clases_asignacion')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerVistaClasesAsignacionPorDocente(docenteId: string) {
    const { data, error } = await supabase
      .from('vista_clases_asignacion')
      .select('*')
      .eq('docente', docenteId);

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación por docente');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerVistaClasesAsignacionPorAula(aulaId: string) {
    const { data, error } = await supabase
      .from('vista_clases_asignacion')
      .select('*')
      .eq('aula', aulaId);

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación por aula');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerVistaClasesAsignacionPorPrograma(programaId: string) {
    const { data, error } = await supabase
      .from('vista_clases_asignacion')
      .select('*')
      .eq('programa', programaId);

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación por programa');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerVistaClasesAsignacionPorFecha(fecha: string) {
    const { data, error } = await supabase
      .from('vista_clases_asignacion')
      .select('*')
      .eq('horario_asignado', fecha);

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación por fecha');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerVistaClasesAsignacionConFiltros(filtros: {
    docente?: string;
    aula?: string;
    programa?: string;
    horario_asignado?: string;
    estado?: string;
  }) {
    let query = supabase
      .from('vista_clases_asignacion')
      .select('*');

    // Aplicar filtros dinámicamente
    if (filtros.docente) {
      query = query.eq('docente', filtros.docente);
    }
    if (filtros.aula) {
      query = query.eq('aula', filtros.aula);
    }
    if (filtros.programa) {
      query = query.eq('programa', filtros.programa);
    }
    if (filtros.horario_asignado) {
      query = query.eq('horario_asignado', filtros.horario_asignado);
    }
    if (filtros.estado) {
      query = query.eq('estado', filtros.estado);
    }

    const { data, error } = await query;

    if (error) {
      handleSupabaseError(error, 'Obtener vista clases asignación con filtros');
    }

    return {
      success: true,
      data: data || []
    };
  }

  // Método genérico para cualquier vista
  async obtenerVista(nombreVista: string, filtros: Record<string, any> = {}) {
    let query = supabase
      .from(nombreVista)
      .select('*');

    // Aplicar filtros dinámicamente
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });

    // Ordenar por estado si existe, sino sin ordenamiento específico
    const { data, error } = await query;

    if (error) {
      handleSupabaseError(error, `Obtener vista ${nombreVista}`);
    }

    return {
      success: true,
      data: data || []
    };
  }

  // =====================================================
  // VISTA: Horario completo por día
  // =====================================================
  async obtenerHorarioCompleto() {
    const { data, error } = await supabase
      .from('vista_horario_completo')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener horario completo');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerHorarioCompletoPorDia(dia: string) {
    const { data, error } = await supabase
      .from('vista_horario_completo')
      .select('*')
      .eq('dia', dia);

    if (error) {
      handleSupabaseError(error, 'Obtener horario completo por día');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerHorarioCompletoPorAula(aula: string) {
    const { data, error } = await supabase
      .from('vista_horario_completo')
      .select('*')
      .eq('aula', aula);

    if (error) {
      handleSupabaseError(error, 'Obtener horario completo por aula');
    }

    return {
      success: true,
      data: data || []
    };
  }

  // =====================================================
  // VISTA: Horario por piso
  // =====================================================
  async obtenerHorarioPorPiso() {
    const { data, error } = await supabase
      .from('vista_horario_por_piso')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener horario por piso');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerHorarioPorPisoEspecifico(piso: string) {
    const { data, error } = await supabase
      .from('vista_horario_por_piso')
      .select('*')
      .eq('piso', piso);

    if (error) {
      handleSupabaseError(error, 'Obtener horario por piso específico');
    }

    return {
      success: true,
      data: data || []
    };
  }

  // =====================================================
  // VISTA: Carga de docentes
  // =====================================================
  async obtenerCargaDocentes() {
    const { data, error } = await supabase
      .from('vista_carga_docentes')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener carga de docentes');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerCargaDocenteEspecifico(docente: string) {
    const { data, error } = await supabase
      .from('vista_carga_docentes')
      .select('*')
      .eq('docente', docente);

    if (error) {
      handleSupabaseError(error, 'Obtener carga de docente específico');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerDocentesPorCarga(minPorcentaje: number, maxPorcentaje: number) {
    const { data, error } = await supabase
      .from('vista_carga_docentes')
      .select('*')
      .gte('porcentaje_carga', minPorcentaje)
      .lte('porcentaje_carga', maxPorcentaje);

    if (error) {
      handleSupabaseError(error, 'Obtener docentes por rango de carga');
    }

    return {
      success: true,
      data: data || []
    };
  }

  // =====================================================
  // VISTA: Ocupación de aulas
  // =====================================================
  async obtenerOcupacionAulas() {
    const { data, error } = await supabase
      .from('vista_ocupacion_aulas')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener ocupación de aulas');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerOcupacionAulaEspecifica(aula: string) {
    const { data, error } = await supabase
      .from('vista_ocupacion_aulas')
      .select('*')
      .eq('aula', aula);

    if (error) {
      handleSupabaseError(error, 'Obtener ocupación de aula específica');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerOcupacionPorPiso(piso: string) {
    const { data, error } = await supabase
      .from('vista_ocupacion_aulas')
      .select('*')
      .eq('piso', piso);

    if (error) {
      handleSupabaseError(error, 'Obtener ocupación por piso');
    }

    return {
      success: true,
      data: data || []
    };
  }

  // =====================================================
  // VISTA: Resumen por programa
  // =====================================================
  async obtenerResumenProgramas() {
    const { data, error } = await supabase
      .from('vista_resumen_programas')
      .select('*');

    if (error) {
      handleSupabaseError(error, 'Obtener resumen de programas');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerResumenProgramaEspecifico(programa: string) {
    const { data, error } = await supabase
      .from('vista_resumen_programas')
      .select('*')
      .eq('programa', programa);

    if (error) {
      handleSupabaseError(error, 'Obtener resumen de programa específico');
    }

    return {
      success: true,
      data: data || []
    };
  }

  async obtenerResumenPorCategoria(categoria: string) {
    const { data, error } = await supabase
      .from('vista_resumen_programas')
      .select('*')
      .eq('categoria', categoria);

    if (error) {
      handleSupabaseError(error, 'Obtener resumen por categoría');
    }

    return {
      success: true,
      data: data || []
    };
  }
}
