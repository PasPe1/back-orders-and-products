import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsNumber()
  serialNumber: number;

  @IsNumber()
  isNew: number;

  @IsString()
  photo: string;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  specification: string;

  @IsNotEmpty()
  guarantee: string;

  @IsNotEmpty()
  price: string;

  @IsNumber()
  order: number;

  @IsString()
  date: string;
}
