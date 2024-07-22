import { ConflictException, Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findOneProductById(id: number): Promise<Product | undefined> {
    return await this.productsRepository.findOneBy({ id });
  }

  async getAllProducts() {
    return await this.productsRepository.query(`SELECT * FROM PRODUCTS`);
  }

  async createProduct(dto: ProductDto) {
    if (await this.productsRepository.findOneBy({ title: dto.title })) {
      throw new ConflictException('Product already exist');
    }

    return await this.productsRepository.save(dto);
  }

  async updateProduct(id: number, props: ProductDto) {
    return await this.productsRepository.save(props);
  }

  async deleteProduct(id: number) {
    return await this.productsRepository.delete(id);
  }
}
