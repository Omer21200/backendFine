import { Test, TestingModule } from '@nestjs/testing';
import { VistasService } from './vistas.service';

describe('VistasService', () => {
  let service: VistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VistasService],
    }).compile();

    service = module.get<VistasService>(VistasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
