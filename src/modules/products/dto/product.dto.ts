import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  serialNumber: number;

  @IsNumber()
  @IsNotEmpty()
  isNew: number;

  @IsString()
  photo: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  date: string;

  @IsNumber()
  orderId: number;
}
