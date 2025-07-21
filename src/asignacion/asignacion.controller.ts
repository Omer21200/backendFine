import { Controller, Post } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Post('resetear')
  async resetear() {
    return this.asignacionService.resetearAmbiente();
  }

  @Post('generar')
  async generar() {
    return this.asignacionService.generarAsignacion();
  }
} 