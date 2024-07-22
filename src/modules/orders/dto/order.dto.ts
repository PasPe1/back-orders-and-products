import { IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  description: string;
}
