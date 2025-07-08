// src/catalogo/catalogo.controller.ts
import { Controller, Get, HttpCode } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';

@Controller('catalogos')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get('tipos-contrato')
  @HttpCode(200)
  obtenerTiposContrato() {
    return this.catalogoService.obtenerTiposContrato();
  }

  @Get('niveles-ingles')
  @HttpCode(200)
  obtenerNivelesIngles() {
    return this.catalogoService.obtenerNivelesIngles();
  }

  @Get('especializaciones')
  @HttpCode(200)
  obtenerEspecializaciones() {
    return this.catalogoService.obtenerEspecializaciones();
  }

  @Get('horarios')
  @HttpCode(200)
  obtenerHorarios() {
    return this.catalogoService.obtenerHorarios();
  }
}
