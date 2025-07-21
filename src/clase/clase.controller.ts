import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto, UpdateClaseDto } from './dto/create-clase.dto';

@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  @HttpCode(201)
  async crear(@Body() dto: CreateClaseDto) {
    return this.claseService.crearClase(dto);
  }

  @Get()
  @HttpCode(200)
  async listar() {
    return this.claseService.listarClases();
  }

  @Get('estado/:estado')
  @HttpCode(200)
  async listarPorEstado(@Param('estado') estado: string) {
    return this.claseService.listarClasesPorEstado(estado);
  }

  @Get('programa/:programaId')
  @HttpCode(200)
  async listarPorPrograma(@Param('programaId') programaId: string) {
    return this.claseService.listarClasesPorPrograma(programaId);
  }

  @Get('prioridad')
  @HttpCode(200)
  async listarPorPrioridad(
    @Query('min') min: string,
    @Query('max') max: string
  ) {
    return this.claseService.obtenerClasesPorPrioridad(Number(min), Number(max));
  }

  @Get(':id')
  @HttpCode(200)
  async obtenerPorId(@Param('id') id: string) {
    return this.claseService.obtenerClasePorId(id);
  }

  @Patch()
  @HttpCode(200)
  async actualizar(@Body() dto: UpdateClaseDto) {
    return this.claseService.actualizarClase(dto);
  }

  @Patch(':id/estado')
  @HttpCode(200)
  async cambiarEstado(
    @Param('id') id: string,
    @Body() body: { estado: string }
  ) {
    return this.claseService.cambiarEstado(id, body.estado);
  }

  @Patch(':id/prioridad')
  @HttpCode(200)
  async cambiarPrioridad(
    @Param('id') id: string,
    @Body() body: { prioridad: number }
  ) {
    return this.claseService.cambiarPrioridad(id, body.prioridad);
  }

  @Delete(':id')
  @HttpCode(200)
  async eliminar(@Param('id') id: string) {
    return this.claseService.eliminarClase(id);
  }
} 