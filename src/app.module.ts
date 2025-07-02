import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramasModule } from './programas/programas.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProgramasModule, UsuarioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
