import { Test, TestingModule } from '@nestjs/testing';
import { VistasController } from './vistas.controller';

describe('VistasController', () => {
  let controller: VistasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VistasController],
    }).compile();

    controller = module.get<VistasController>(VistasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
