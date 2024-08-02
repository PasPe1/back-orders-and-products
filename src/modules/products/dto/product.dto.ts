import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

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

  @IsNumber()
  sequence: number;

  @IsObject()
  guarantee: {
    start: Date;
    end: Date;
  };

  @IsArray()
  price: { value: number; symbol: string; isDefault: number }[];

  @IsString()
  date: string;

  @IsNumber()
  orderId: number;
}
