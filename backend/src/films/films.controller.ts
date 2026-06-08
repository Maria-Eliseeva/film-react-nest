import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmScheduleResponseDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findSchedule(
    @Param('id') id: string,
  ): Promise<FilmScheduleResponseDTO> {
    return this.filmsService.findSchedule(id);
  }
}
