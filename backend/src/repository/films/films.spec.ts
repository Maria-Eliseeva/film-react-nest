import { Test, TestingModule } from '@nestjs/testing';
import { FilmsTypeOrmRepository as FilmsRepository } from './films';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../../entity/Film';
import { Schedule } from '../../entity/Schedule';

describe('FilmsRepository', () => {
  let provider: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsRepository,
        { provide: getRepositoryToken(Film), useValue: {} },
        { provide: getRepositoryToken(Schedule), useValue: {} },
      ],
    }).compile();

    provider = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
