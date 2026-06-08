import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FilmDTO,
  FilmResponseDTO,
  FilmScheduleResponseDTO,
} from './dto/films.dto';
import { FilmsMongoDbRepository } from '../repository/films/films';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async create(data: Omit<FilmDTO, 'id'>): Promise<FilmDTO> {
    try {
      return await this.filmsRepository.save(data);
    } catch (e) {
      throw new BadRequestException({ error: `ошибка создания фильма` });
    }
  }

  async findAll(): Promise<FilmResponseDTO> {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films.map(({ schedule, ...film }) => film),
    };
  }

  async findSchedule(id: string): Promise<FilmScheduleResponseDTO> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async findById(id: string): Promise<FilmDTO | null> {
    return this.filmsRepository.findById(id);
  }
}
