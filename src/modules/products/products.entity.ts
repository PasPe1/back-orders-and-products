import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: number;

  @Column()
  isNew: number;

  @Column()
  photo: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  specification: string;

  @Column({ type: 'varchar', nullable: false })
  guarantee: string;
  //   {
  //     start: '2017-06-29 12:09:33',
  //     end: '2017-06-29 12:09:33'
  //   }

  @Column({ type: 'varchar', nullable: false })
  price: string;
  //   [
  //     {value: 100, symbol: 'USD', isDefault: 0},
  //     {value: 2600, symbol: 'UAH', isDefault: 1}
  //   ],

  @Column()
  order: number;

  @Column()
  date: string;

  @ManyToMany(() => Order)
  @JoinTable()
  orders: Order[];
}
