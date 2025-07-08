// src/catalogo/catalogo.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';

@Controller('catalogos')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get('tipos-contrato')
  obtenerTiposContrato() {
    return this.catalogoService.obtenerTiposContrato();
  }

  @Get('niveles-ingles')
  obtenerNivelesIngles() {
    return this.catalogoService.obtenerNivelesIngles();
  }

  @Get('especializaciones')
  obtenerEspecializaciones() {
    return this.catalogoService.obtenerEspecializaciones();
  }

  @Get('horarios')
  obtenerHorarios() {
    return this.catalogoService.obtenerHorarios();
  }
}
