import { Test, TestingModule } from '@nestjs/testing';
import { NotaProdutoController } from './nota-produto.controller';
import { NotaProdutoService } from './nota-produto.service';

describe('NotaProdutoController', () => {
  let controller: NotaProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaProdutoController],
      providers: [NotaProdutoService],
    }).compile();

    controller = module.get<NotaProdutoController>(NotaProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
