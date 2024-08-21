import { Test, TestingModule } from '@nestjs/testing';
import { SummaryClientService } from './summary-client.service';

describe('SummaryClientService', () => {
  let service: SummaryClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummaryClientService],
    }).compile();

    service = module.get<SummaryClientService>(SummaryClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
