import { Test, TestingModule } from '@nestjs/testing';
import { TouchpointsController } from './touchpoints.controller';
import { TouchpointsService } from './touchpoints.service';

describe('TouchpointsController', () => {
  let controller: TouchpointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouchpointsController],
      providers: [TouchpointsService],
    }).compile();

    controller = module.get<TouchpointsController>(TouchpointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
