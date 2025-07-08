// src/catalogo/catalogo.service.ts
import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class CatalogoService {
  async obtenerTiposContrato() {
    const { data, error } = await supabase.from('tipo_contrato').select('*');
    if (error) throw new Error('Error al obtener tipos de contrato: ' + error.message);
    return data;
  }

  async obtenerNivelesIngles() {
    const { data, error } = await supabase.from('nivel_ingles').select('*');
    if (error) throw new Error('Error al obtener niveles de inglés: ' + error.message);
    return data;
  }

  async obtenerEspecializaciones() {
    const { data, error } = await supabase.from('especializacion').select('*');
    if (error) throw new Error('Error al obtener especializaciones: ' + error.message);
    return data;
  }

  async obtenerHorarios() {
    const { data, error } = await supabase.from('horario').select('*');
    if (error) throw new Error('Error al obtener horarios: ' + error.message);
    return data;
  }
}
