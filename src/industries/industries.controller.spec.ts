import { Test, TestingModule } from '@nestjs/testing';
import { IndustryController } from './industries.controller';
import { IndustriesService } from './industries.service';

describe('IndustryController', () => {
  let controller: IndustryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndustryController],
      providers: [IndustriesService],
    }).compile();

    controller = module.get<IndustryController>(IndustryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
