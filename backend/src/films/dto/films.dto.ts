export interface ScheduleDTO {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: ScheduleDTO[];
}

export interface FilmResponseDTO {
  total: number;
  items: Omit<FilmDTO, 'schedule'>[];
}

export interface FilmScheduleResponseDTO {
  total: number;
  items: ScheduleDTO[];
}
