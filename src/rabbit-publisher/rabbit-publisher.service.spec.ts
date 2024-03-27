import { Test, TestingModule } from '@nestjs/testing';
import { RabbitPublisherService } from './rabbit-publisher.service';

describe('RabbitPublisherService', () => {
  let service: RabbitPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitPublisherService],
    }).compile();

    service = module.get<RabbitPublisherService>(RabbitPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
