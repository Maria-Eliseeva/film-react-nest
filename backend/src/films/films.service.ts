import { Injectable } from '@nestjs/common';
import { Film, FilmsRepository } from '../repository/films.repository/films';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  create(data: Omit<Film, 'id'>) {
    try {
      return this.filmsRepository.save(data);
    } catch (e) {
      // внутри сервиса можно реализовать логику обработки данных, ошибок и тд
      throw new Error('Фильм с таким названием уже существует');
    }
  }

  findById(id: number) {
    // создаем копию, чтобы не удалять пароль из оригинального объекта 
    const film = { ...this.filmsRepository.findById(id) };

    return film;
  }

}