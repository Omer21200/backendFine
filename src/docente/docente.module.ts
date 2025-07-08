import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';

@Module({
  providers: [DocenteService],
  controllers: [DocenteController]
})
export class DocenteModule {}
