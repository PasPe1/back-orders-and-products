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
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from './products.entity';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return await this.productsService.findOneProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() props: ProductDto) {
    return this.productsService.createProduct(props);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() props: ProductDto) {
    return this.productsService.updateProduct(id, props);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
