import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../../entity/Film';
import { Schedule } from '../../entity/Schedule';

export interface FilmsRepository {
  findAll(): Promise<Film[]>;
  findById(id: string): Promise<Film | null>;
  save(film: Omit<Film, 'id'>): Promise<Film>;
  update(id: string, data: Partial<Omit<Film, 'id'>>): Promise<Film | null>;
  delete(id: string): Promise<void>;
  reserveSeat(
    filmId: string,
    sessionId: string,
    seat: string,
  ): Promise<Film | null>;
}

@Injectable()
export class FilmsTypeOrmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedule'] });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async save(filmData: Omit<Film, 'id'>): Promise<Film> {
    const newFilm = this.filmRepository.create(filmData);
    return this.filmRepository.save(newFilm);
  }

  async update(
    id: string,
    data: Partial<Omit<Film, 'id'>>,
  ): Promise<Film | null> {
    await this.filmRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.filmRepository.delete(id);
  }

  async reserveSeat(
    filmId: string,
    sessionId: string,
    seat: string,
  ): Promise<Film | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, film: { id: filmId } },
      relations: ['film'],
    });
    if (!schedule) return null;
    if (schedule.taken.includes(seat)) return null;
    schedule.taken.push(seat);
    await this.scheduleRepository.save(schedule);
    return this.findById(filmId);
  }
}
