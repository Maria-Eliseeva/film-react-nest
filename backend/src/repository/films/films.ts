import { Inject, Injectable } from '@nestjs/common';
import mongoose, {
  Mongoose,
  Schema,
  Model,
} from 'mongoose';

import {
  ScheduleDTO,
  FilmDTO,
} from '../../films/dto/films.dto';

const ScheduleSchema = new Schema<ScheduleDTO>({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], required: true },
});

const FilmSchema = new Schema<FilmDTO>({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

export interface FilmsRepository {
  findAll(): Promise<FilmDTO[]>;
  findById(id: string): Promise<FilmDTO | null>;
  save(film: Omit<FilmDTO, 'id'>): Promise<FilmDTO>;
  update( id: string, data: Partial<Omit<FilmDTO, 'id'>>): Promise<FilmDTO | null>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class FilmsMongoDbRepository
  implements FilmsRepository {
  private filmModel: Model<FilmDTO>;

  constructor(private connection: Mongoose) {
    this.filmModel = this.connection.model<FilmDTO>( 'Film', FilmSchema);
  }

  async findAll(): Promise<FilmDTO[]> {
    return this.filmModel.find();
  }

  async findById( id: string ): Promise<FilmDTO | null> {
    return this.filmModel.findOne({ id });
  }

  async save( film: Omit<FilmDTO, 'id'>): Promise<FilmDTO> {
    const createdFilm =
      await this.filmModel.create({
        ...film,
        id: crypto.randomUUID(),
      });

    return createdFilm.toObject();
  }

  async update( id: string, data: Partial<Omit<FilmDTO, 'id'>>): Promise<FilmDTO | null> {
    return this.filmModel.findOneAndUpdate({ id }, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.filmModel.deleteOne({ id });
  }
}