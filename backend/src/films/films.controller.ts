import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmDTO[]> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string): Promise<ScheduleDTO[]> {
    return this.filmsService.findSchedule(id);
  }
}
