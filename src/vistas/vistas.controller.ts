import { Controller, Get, Query, Param, HttpCode } from '@nestjs/common';
import { VistasService } from './vistas.service';

@Controller('vistas')
export class VistasController {
  constructor(private readonly vistasService: VistasService) {}

  @Get('clases-asignacion')
  @HttpCode(200)
  async obtenerVistaClasesAsignacion() {
    return this.vistasService.obtenerVistaClasesAsignacion();
  }

  @Get('clases-asignacion/docente/:docenteId')
  @HttpCode(200)
  async obtenerVistaClasesAsignacionPorDocente(@Param('docenteId') docenteId: string) {
    return this.vistasService.obtenerVistaClasesAsignacionPorDocente(docenteId);
  }

  @Get('clases-asignacion/aula/:aulaId')
  @HttpCode(200)
  async obtenerVistaClasesAsignacionPorAula(@Param('aulaId') aulaId: string) {
    return this.vistasService.obtenerVistaClasesAsignacionPorAula(aulaId);
  }

  @Get('clases-asignacion/programa/:programaId')
  @HttpCode(200)
  async obtenerVistaClasesAsignacionPorPrograma(@Param('programaId') programaId: string) {
    return this.vistasService.obtenerVistaClasesAsignacionPorPrograma(programaId);
  }

  @Get('clases-asignacion/fecha/:fecha')
  @HttpCode(200)
  async obtenerVistaClasesAsignacionPorFecha(@Param('fecha') fecha: string) {
    return this.vistasService.obtenerVistaClasesAsignacionPorFecha(fecha);
  }

  @Get('clases-asignacion/filtros')
  @HttpCode(200)
  async obtenerVistaClasesAsignacionConFiltros(
    @Query('docente') docente?: string,
    @Query('aula') aula?: string,
    @Query('programa') programa?: string,
    @Query('horario_asignado') horario_asignado?: string,
    @Query('estado') estado?: string,
  ) {
    const filtros = {
      docente,
      aula,
      programa,
      horario_asignado,
      estado,
    };

    // Remover filtros undefined
    Object.keys(filtros).forEach(key => {
      if (filtros[key] === undefined) {
        delete filtros[key];
      }
    });

    return this.vistasService.obtenerVistaClasesAsignacionConFiltros(filtros);
  }

  // =====================================================
  // ENDPOINTS: Horario completo por día
  // =====================================================
  @Get('horario-completo')
  @HttpCode(200)
  async obtenerHorarioCompleto() {
    return this.vistasService.obtenerHorarioCompleto();
  }

  @Get('horario-completo/dia/:dia')
  @HttpCode(200)
  async obtenerHorarioCompletoPorDia(@Param('dia') dia: string) {
    return this.vistasService.obtenerHorarioCompletoPorDia(dia);
  }

  @Get('horario-completo/aula/:aula')
  @HttpCode(200)
  async obtenerHorarioCompletoPorAula(@Param('aula') aula: string) {
    return this.vistasService.obtenerHorarioCompletoPorAula(aula);
  }

  // =====================================================
  // ENDPOINTS: Horario por piso
  // =====================================================
  @Get('horario-por-piso')
  @HttpCode(200)
  async obtenerHorarioPorPiso() {
    return this.vistasService.obtenerHorarioPorPiso();
  }

  @Get('horario-por-piso/:piso')
  @HttpCode(200)
  async obtenerHorarioPorPisoEspecifico(@Param('piso') piso: string) {
    return this.vistasService.obtenerHorarioPorPisoEspecifico(piso);
  }

  // =====================================================
  // ENDPOINTS: Carga de docentes
  // =====================================================
  @Get('carga-docentes')
  @HttpCode(200)
  async obtenerCargaDocentes() {
    return this.vistasService.obtenerCargaDocentes();
  }

  @Get('carga-docentes/:docente')
  @HttpCode(200)
  async obtenerCargaDocenteEspecifico(@Param('docente') docente: string) {
    return this.vistasService.obtenerCargaDocenteEspecifico(docente);
  }

  @Get('carga-docentes/rango')
  @HttpCode(200)
  async obtenerDocentesPorCarga(
    @Query('min') min: string,
    @Query('max') max: string
  ) {
    return this.vistasService.obtenerDocentesPorCarga(Number(min), Number(max));
  }

  // =====================================================
  // ENDPOINTS: Ocupación de aulas
  // =====================================================
  @Get('ocupacion-aulas')
  @HttpCode(200)
  async obtenerOcupacionAulas() {
    return this.vistasService.obtenerOcupacionAulas();
  }

  @Get('ocupacion-aulas/:aula')
  @HttpCode(200)
  async obtenerOcupacionAulaEspecifica(@Param('aula') aula: string) {
    return this.vistasService.obtenerOcupacionAulaEspecifica(aula);
  }

  @Get('ocupacion-aulas/piso/:piso')
  @HttpCode(200)
  async obtenerOcupacionPorPiso(@Param('piso') piso: string) {
    return this.vistasService.obtenerOcupacionPorPiso(piso);
  }

  // =====================================================
  // ENDPOINTS: Resumen por programa
  // =====================================================
  @Get('resumen-programas')
  @HttpCode(200)
  async obtenerResumenProgramas() {
    return this.vistasService.obtenerResumenProgramas();
  }

  @Get('resumen-programas/:programa')
  @HttpCode(200)
  async obtenerResumenProgramaEspecifico(@Param('programa') programa: string) {
    return this.vistasService.obtenerResumenProgramaEspecifico(programa);
  }

  @Get('resumen-programas/categoria/:categoria')
  @HttpCode(200)
  async obtenerResumenPorCategoria(@Param('categoria') categoria: string) {
    return this.vistasService.obtenerResumenPorCategoria(categoria);
  }

  // Endpoint genérico para cualquier vista
  @Get(':nombreVista')
  @HttpCode(200)
  async obtenerVista(
    @Param('nombreVista') nombreVista: string,
    @Query() filtros: Record<string, any>
  ) {
    return this.vistasService.obtenerVista(nombreVista, filtros);
  }
}
