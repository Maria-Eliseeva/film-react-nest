import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsTypeOrmRepository } from '../repository/films/films';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsTypeOrmRepository,
          useValue: { findById: jest.fn(), reserveSeat: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
