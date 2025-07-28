import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProgramasService } from './programas.service';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Get('listar') // GET /programas/listar
  getAll() {
    return this.programasService.obtenerTodos();
  }

  @Get('resumen') // GET /programas/resumen
  getResumen() {
    return this.programasService.obtenerTodos();
  }

  @Post('crear') // POST /programas/crear
  create(@Body() body: { nombre: string }) {
    return this.programasService.crearPrograma(body.nombre);
  }
}
