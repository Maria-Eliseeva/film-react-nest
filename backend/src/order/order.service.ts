import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRequestDTO, OrderResponseDTO } from './dto/order.dto';
import { FilmsTypeOrmRepository } from '../repository/films/films';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsTypeOrmRepository) {}

  async create(order: OrderRequestDTO): Promise<OrderResponseDTO> {
    if (!order.tickets || order.tickets.length === 0) {
      throw new BadRequestException({ error: 'Список билетов пуст' });
    }

    for (const ticket of order.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);

      if (!film) {
        throw new BadRequestException({ error: `Фильм не найден` });
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (!session || session.daytime !== ticket.daytime) {
        throw new BadRequestException({ error: `Сеанс не найден` });
      }

      const seat = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(seat)) {
        throw new BadRequestException({ error: `Место уже занято` });
      }
    }

    for (const ticket of order.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      const reservedFilm = await this.filmsRepository.reserveSeat(
        ticket.film,
        ticket.session,
        seat,
      );
      if (!reservedFilm) {
        throw new BadRequestException({
          error: `ошибка при бронировании места`,
        });
      }
    }

    const items = order.tickets.map((ticket) => ({
      ...ticket,
      id: crypto.randomUUID(),
    }));

    return {
      total: items.length,
      items,
    };
  }
}
