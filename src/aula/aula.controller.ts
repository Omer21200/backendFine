import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto, UpdateAulaDto } from './dto/create-aula.dto';

@Controller('aulas')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(201)
  async crear(@Body() dto: CreateAulaDto) {
    return this.aulaService.crearAula(dto);
  }

  @Get()
  @HttpCode(200)
  async listar() {
    return this.aulaService.listarAulas();
  }

  @Get('disponibles')
  @HttpCode(200)
  async listarDisponibles() {
    return this.aulaService.listarAulasDisponibles();
  }

  @Get('piso/:piso')
  @HttpCode(200)
  async listarPorPiso(@Param('piso') piso: string) {
    return this.aulaService.listarAulasPorPiso(piso);
  }

  @Get(':id')
  @HttpCode(200)
  async obtenerPorId(@Param('id') id: string) {
    return this.aulaService.obtenerAulaPorId(id);
  }

  @Patch()
  @HttpCode(200)
  async actualizar(@Body() dto: UpdateAulaDto) {
    return this.aulaService.actualizarAula(dto);
  }

  @Patch(':id/disponibilidad')
  @HttpCode(200)
  async cambiarDisponibilidad(
    @Param('id') id: string,
    @Body() body: { disponible: boolean }
  ) {
    return this.aulaService.cambiarDisponibilidad(id, body.disponible);
  }

  @Delete(':id')
  @HttpCode(200)
  async eliminar(@Param('id') id: string) {
    return this.aulaService.eliminarAula(id);
  }

  @Get('eliminadas')
  @HttpCode(200)
  async listarEliminadas() {
    return this.aulaService.listarAulasEliminadas();
  }

  @Patch(':id/restaurar')
  @HttpCode(200)
  async restaurar(@Param('id') id: string) {
    return this.aulaService.restaurarAula(id);
  }

  @Delete(':id/definitivo')
  @HttpCode(200)
  async eliminarDefinitivamente(@Param('id') id: string) {
    return this.aulaService.eliminarAulaDefinitivamente(id);
  }
}
