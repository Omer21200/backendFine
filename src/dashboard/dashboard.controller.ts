import { Controller, Get, HttpCode } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('estadisticas')
  @HttpCode(200)
  async obtenerEstadisticas() {
    return this.dashboardService.obtenerEstadisticasCompletas();
  }

  @Get('estadisticas/docentes')
  @HttpCode(200)
  async obtenerEstadisticasDocentes() {
    return this.dashboardService.obtenerEstadisticasDocentes();
  }
}
