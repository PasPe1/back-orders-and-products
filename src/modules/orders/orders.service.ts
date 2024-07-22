import { ConflictException, Injectable } from '@nestjs/common';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findOneOrderById(id: number): Promise<Order | undefined> {
    return await this.ordersRepository.findOneBy({ id });
  }

  async getAllOrders() {
    return await this.ordersRepository.query(`SELECT * FROM ORDERS`);
  }

  async createOrder(dto: OrderDto) {
    if (await this.ordersRepository.findOneBy({ title: dto.title })) {
      throw new ConflictException('Order already exist');
    }

    return await this.ordersRepository.save(dto);
  }

  async updateOrder(id: number, props: OrderDto) {
    return await this.ordersRepository.save(props);
  }

  async deleteOrder(id: number) {
    return await this.ordersRepository.delete(id);
  }
}
