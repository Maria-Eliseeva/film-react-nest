import { Inject, Injectable } from '@nestjs/common';
import { Connection, Schema, Model } from 'mongoose';

import { ScheduleDTO, FilmDTO } from '../../films/dto/films.dto';

const ScheduleSchema = new Schema<ScheduleDTO>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: String, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], required: true },
  },
  { _id: false },
);

const FilmSchema = new Schema<FilmDTO>(
  {
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
  },
  { _id: false },
);

export interface FilmsRepository {
  findAll(): Promise<FilmDTO[]>;
  findById(id: string): Promise<FilmDTO | null>;
  save(film: Omit<FilmDTO, 'id'>): Promise<FilmDTO>;
  update(
    id: string,
    data: Partial<Omit<FilmDTO, 'id'>>,
  ): Promise<FilmDTO | null>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  private filmModel: Model<FilmDTO>;
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {
    this.filmModel = this.connection.model<FilmDTO>('Film', FilmSchema);
  }

  async findAll(): Promise<FilmDTO[]> {
    return this.filmModel.find({}, { _id: false }).lean();
  }

  async findById(id: string): Promise<FilmDTO | null> {
    return this.filmModel.findOne({ id }, { _id: false }).lean();
  }

  async save(film: Omit<FilmDTO, 'id'>): Promise<FilmDTO> {
    const createdFilm = await this.filmModel.create({
      ...film,
      id: crypto.randomUUID(),
    });

    return createdFilm.toObject();
  }

  async update(id: string, data: Partial<FilmDTO>): Promise<FilmDTO | null> {
    return this.filmModel
      .findOneAndUpdate({ id }, data, { new: true, projection: { _id: false } })
      .lean();
  }

  async delete(id: string): Promise<void> {
    await this.filmModel.deleteOne({ id });
  }
}
