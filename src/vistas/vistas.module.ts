import { Module } from '@nestjs/common';
import { VistasController } from './vistas.controller';
import { VistasService } from './vistas.service';

@Module({
  controllers: [VistasController],
  providers: [VistasService]
})
export class VistasModule {}
