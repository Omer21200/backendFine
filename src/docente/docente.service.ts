// src/docente/docente.service.ts
import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { CreateDocenteDto, UpdateDocenteDto } from './dto/create-docente.dto';
import { handleSupabaseError } from '../utils/supabase-error-handler';

@Injectable()
export class DocenteService {
  async crearDocente(dto: CreateDocenteDto) {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      cedula,
      correo,
      telefono,
      tipo_contrato_id,
      experiencia_anios,
      nivel_ingles_id,
      horas_disponibles,
      especializaciones,
      horarios,
    } = dto;

    // 1. Insertar persona
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

    handleSupabaseError(personaError, 'Crear persona');

    if (!personaData) {
      throw new Error('No se pudo crear la persona');
    }

    const personaId = personaData.id;

    // 2. Insertar docente (activo por defecto true)
    const { error: docenteError, data: docenteData } = await supabase
      .from('docente')
      .insert([
        {
          persona_id: personaId,
          tipo_contrato_id,
          experiencia_anios,
          nivel_ingles_id,
          horas_disponibles,
          activo: true,
        },
      ])
      .select('id')
      .single();

    if (docenteError) {
      // Si falla docente, elimina persona creada
      await supabase.from('persona').delete().eq('id', personaId);
      handleSupabaseError(docenteError, 'Crear docente');
    }

    if (!docenteData) {
      throw new Error('No se pudo crear el docente');
    }

    const docenteId = docenteData.id;

    // 3. Insertar relaciones con especializaciones (muchos a muchos)
    const relacionesEspecializaciones = especializaciones.map((espId) => ({
      docente_id: docenteId,
      especializacion_id: espId,
    }));

    const { error: especializacionesError } = await supabase
      .from('docente_especializacion')
      .insert(relacionesEspecializaciones);

    if (especializacionesError) {
      await supabase.from('docente').delete().eq('id', docenteId);
      await supabase.from('persona').delete().eq('id', personaId);
      handleSupabaseError(especializacionesError, 'Asignar especializaciones');
    }

    // 4. Insertar relaciones con horarios (muchos a muchos)
    if (horarios && horarios.length > 0) {
      const relacionesHorarios = horarios.map((horarioId) => ({
        docente_id: docenteId,
        horario_id: horarioId,
      }));

      const { error: horariosError } = await supabase
        .from('docente_horario')
        .insert(relacionesHorarios);

      if (horariosError) {
        await supabase.from('docente_especializacion').delete().eq('docente_id', docenteId);
        await supabase.from('docente').delete().eq('id', docenteId);
        await supabase.from('persona').delete().eq('id', personaId);
        handleSupabaseError(horariosError, 'Asignar horarios');
      }
    }

    return { message: 'Docente creado correctamente', docenteId };
  }

  async listarDocentes() {
    const { data, error } = await supabase
      .from('docente')
      .select(`
        id,
        experiencia_anios,
        horas_disponibles,
        activo,
        persona:persona_id (
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          cedula,
          correo,
          telefono
        ),
        tipo_contrato:tipo_contrato_id (
          nombre
        ),
        nivel_ingles:nivel_ingles_id (
          nombre
        ),
        especializaciones:docente_especializacion!inner (
          especializacion (
            nombre
          )
        ),
        horarios:docente_horario!left (
          horario (
            dia,
            hora_inicio,
            hora_fin
          )
        )
      `)
      .eq('activo', true);

    handleSupabaseError(error, 'Listar docentes activos');

    return data;
  }

  async listarDocentesInactivos() {
    const { data, error } = await supabase
      .from('docente')
      .select(`
        id,
        experiencia_anios,
        horas_disponibles,
        activo,
        persona:persona_id (
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          cedula,
          correo,
          telefono
        ),
        tipo_contrato:tipo_contrato_id (
          nombre
        ),
        nivel_ingles:nivel_ingles_id (
          nombre
        ),
        especializaciones:docente_especializacion!inner (
          especializacion (
            nombre
          )
        ),
        horarios:docente_horario!left (
          horario (
            dia,
            hora_inicio,
            hora_fin
          )
        )
      `)
      .eq('activo', false);

    handleSupabaseError(error, 'Listar docentes inactivos');

    return data;
  }

  async actualizarDocente(dto: UpdateDocenteDto) {
    const {
      docente_id,
      persona_id,
      especializaciones,
      horarios, // ignoramos este campo en actualización normal
      ...camposPosibles
    } = dto;

    // 1. Obtener datos actuales
    const { data: actual, error: errActual } = await supabase
      .from('docente')
      .select(`
        id,
        experiencia_anios,
        horas_disponibles,
        tipo_contrato_id,
        nivel_ingles_id,
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
      .eq('id', docente_id)
      .single();

    if (errActual || !actual) {
      throw new Error('No se pudo obtener el docente');
    }

    // 2. Comparar y construir cambios para persona
    const personaUpdate: any = {};
    const camposPersona = [
      'primer_nombre',
      'segundo_nombre',
      'primer_apellido',
      'segundo_apellido',
      'cedula',
      'correo',
      'telefono',
    ];

    for (const campo of camposPersona) {
      if (dto[campo] !== undefined && dto[campo] !== actual.persona[campo]) {
        personaUpdate[campo] = dto[campo];
      }
    }

    if (Object.keys(personaUpdate).length > 0) {
      const { error } = await supabase
        .from('persona')
        .update(personaUpdate)
        .eq('id', persona_id);
      handleSupabaseError(error, 'Actualizar persona');
    }

    // 3. Comparar y construir cambios para docente (sin tocar activo)
    const docenteUpdate: any = {};
    const camposDocente = [
      'tipo_contrato_id',
      'experiencia_anios',
      'nivel_ingles_id',
      'horas_disponibles',
    ];

    for (const campo of camposDocente) {
      if (dto[campo] !== undefined && dto[campo] !== actual[campo]) {
        docenteUpdate[campo] = dto[campo];
      }
    }

    if (Object.keys(docenteUpdate).length > 0) {
      const { error } = await supabase
        .from('docente')
        .update(docenteUpdate)
        .eq('id', docente_id);
      handleSupabaseError(error, 'Actualizar docente');
    }

    // 4. Actualizar especializaciones si se proporcionaron
    if (Array.isArray(especializaciones)) {
      await supabase.from('docente_especializacion').delete().eq('docente_id', docente_id);
      const nuevas = especializaciones.map((id) => ({
        docente_id,
        especializacion_id: id,
      }));
      const { error } = await supabase.from('docente_especializacion').insert(nuevas);
      handleSupabaseError(error, 'Actualizar especializaciones');
    }

    // 5. Actualizar horarios si se proporcionaron
    if (Array.isArray(horarios)) {
      await supabase.from('docente_horario').delete().eq('docente_id', docente_id);
      const nuevos = horarios.map((id) => ({
        docente_id,
        horario_id: id,
      }));
      const { error } = await supabase.from('docente_horario').insert(nuevos);
      handleSupabaseError(error, 'Actualizar horarios');
    }

    return { message: 'Docente actualizado correctamente' };
  }

  // Nuevo método para activar o desactivar docente
  async activarDesactivarDocente(docente_id: string, activo: boolean) {
    const { error } = await supabase
      .from('docente')
      .update({ activo })
      .eq('id', docente_id);

    handleSupabaseError(error, 'Actualizar estado docente');

    return { message: `Docente ${activo ? 'activado' : 'desactivado'} correctamente` };
  }
}
