import { Test, TestingModule } from '@nestjs/testing';
import { BusinessStaffController } from './business-staff.controller';
import { BusinessStaffService } from './business-staff.service';

describe('BusinessStaffController', () => {
  let controller: BusinessStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessStaffController],
      providers: [BusinessStaffService],
    }).compile();

    controller = module.get<BusinessStaffController>(BusinessStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
