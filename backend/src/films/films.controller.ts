import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): FilmDTO[] {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') id: string): FilmDTO {
    return this.filmsService.findSchedule(id);
  }
}
