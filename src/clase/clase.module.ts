import { Module } from '@nestjs/common';
import { ClaseController } from './clase.controller';
import { ClaseService } from './clase.service';

@Module({
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {} 