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



  @Patch()
  @HttpCode(200)
  async actualizar(@Body() dto: UpdateClaseDto) {
    return this.claseService.actualizarClase(dto);
  }

  @Patch('sin-estado')
  @HttpCode(200)
  async actualizarSinEstado(@Body() dto: UpdateClaseDto) {
    return this.claseService.actualizarClaseSinEstado(dto);
  }



  @Delete(':id')
  @HttpCode(200)
  async eliminar(@Param('id') id: string) {
    return this.claseService.eliminarClase(id);
  }
} 