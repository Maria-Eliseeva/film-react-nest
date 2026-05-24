export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderRequestDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}

export class OrderResponseDTO {
  total: number;
  items: (TicketDTO & { id: string })[];
}
