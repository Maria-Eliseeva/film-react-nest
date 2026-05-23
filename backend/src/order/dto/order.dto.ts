export interface TicketDTO {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export interface OrderRequestDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}

export interface OrderResponseDTO {
  total: number;
  items: (TicketDTO & { id: string })[];
}
