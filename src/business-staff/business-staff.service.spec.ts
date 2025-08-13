import { Test, TestingModule } from '@nestjs/testing';
import { BusinessStaffService } from './business-staff.service';

describe('BusinessStaffService', () => {
  let service: BusinessStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessStaffService],
    }).compile();

    service = module.get<BusinessStaffService>(BusinessStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
