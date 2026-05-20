import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }
}
