import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return 'Hello world';
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string): Promise<ScheduleDTO[]> {
    return this.filmsService.findSchedule(id);
  }
}
