import { Test, TestingModule } from '@nestjs/testing';
import { NotaProdutoService } from './nota-produto.service';

describe('NotaProdutoService', () => {
  let service: NotaProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaProdutoService],
    }).compile();

    service = module.get<NotaProdutoService>(NotaProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
