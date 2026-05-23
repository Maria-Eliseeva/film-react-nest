import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequestDTO, OrderResponseDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: OrderRequestDTO): Promise<OrderResponseDTO> {
    return this.orderService.create(body);
  }
}
