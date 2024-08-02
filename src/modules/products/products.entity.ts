import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  sequence: number;

  @Column({ type: 'jsonb' })
  guarantee: {
    start: Date;
    end: Date;
  };

  @Column({ type: 'json', nullable: false })
  price: { value: number; symbol: string; isDefault: number }[];

  @Column()
  date: string;

  @ManyToOne(() => Order, (order) => order.products, { onDelete: 'CASCADE' })
  order: Order;
}
