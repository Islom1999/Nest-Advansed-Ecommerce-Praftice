import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderDto } from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Body() orderDto: orderDto) {
    return this.orderService.createOrder(orderDto);
  } 
}  
