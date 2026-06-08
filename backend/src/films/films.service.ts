import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FilmDTO,
  FilmResponseDTO,
  FilmScheduleResponseDTO,
} from './dto/films.dto';
import { FilmsTypeOrmRepository } from '../repository/films/films';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsTypeOrmRepository) {}

  async findAll(): Promise<FilmResponseDTO> {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films.map(({ schedule, ...film }) => ({
        ...film,
        schedule: schedule ?? [],
      })),
    };
  }

  async findSchedule(id: string): Promise<FilmScheduleResponseDTO> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return {
      total: film.schedule?.length ?? 0,
      items: film.schedule ?? [],
    };
  }

  async findById(id: string): Promise<FilmDTO | null> {
    const film = await this.filmsRepository.findById(id);
    if (!film) return null;

    return {
      ...film,
      schedule: film.schedule ?? [],
    };
  }
}
