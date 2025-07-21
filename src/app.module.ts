import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramasModule } from './programas/programas.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { DocenteModule } from './docente/docente.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AulaModule } from './aula/aula.module';
import { VistasModule } from './vistas/vistas.module';
import { ClaseModule } from './clase/clase.module';
import { AsignacionModule } from './asignacion/asignacion.module';

@Module({
  imports: [ProgramasModule, UsuarioModule, AuthModule, DocenteModule, CatalogoModule, DashboardModule, AulaModule, VistasModule, ClaseModule, AsignacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
