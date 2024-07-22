import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  description: string;

  // @OneToMany(() => Product, (product) => product.order)
  // products: Product[]
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
