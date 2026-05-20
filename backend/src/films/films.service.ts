import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';
import { FilmsMongoDbRepository } from '../repository/films/films';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsRepository: FilmsMongoDbRepository,
  ) {}

  async create( data: Omit<FilmDTO, 'id'> ): Promise<FilmDTO> {
    try {
      return await this.filmsRepository.save(data);
    } catch (e) {
      throw new Error(
        'ошибка создания фильма',
      );
    }
  }

  async findAll(): Promise<FilmDTO[]> {
    return this.filmsRepository.findAll();
  }

  async findSchedule(
    id: string,
  ): Promise<ScheduleDTO[]> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(
        'Фильм не найден',
      );
    }

    return film.schedule;
  }

  async findById( id: string ): Promise<FilmDTO | null> {
    return this.filmsRepository.findById(id);
  }
}