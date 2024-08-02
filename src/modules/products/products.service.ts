import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private orderService: OrdersService,
  ) {}

  async findOneProductById(id: number): Promise<Product | undefined> {
    return await this.productsRepository.findOneBy({ id });
  }

  async getAllProducts() {
    const sortField = 'sequence';
    const sortOrder = 'ASC';
    return await this.productsRepository.find({
      order: {
        [sortField]: sortOrder,
      },
    });
  }

  async createProduct(dto: ProductDto) {
    // if (await this.productsRepository.findOneBy({ title: dto.title })) {
    //   throw new ConflictException('Product already exist');
    // }

    const order = await this.orderService.findOneOrderById(dto.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const product = this.productsRepository.create({ ...dto, order });

    return await this.productsRepository.save(product);
  }

  async updateProduct(id: number, props: ProductDto) {
    return await this.productsRepository.save(props);
  }

  async deleteProduct(id: number) {
    return await this.productsRepository.delete(id);
  }
}
