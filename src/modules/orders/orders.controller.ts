import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Order } from './orders.entity';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return await this.ordersService.findOneOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() props: OrderDto) {
    return this.ordersService.createOrder(props);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() props: OrderDto) {
    return this.ordersService.updateOrder(id, props);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
