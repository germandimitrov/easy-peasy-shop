import { Entity, PrimaryGeneratedColumn, BaseEntity, Column,  ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({ name: 'orders_details' })

export class OrderDetails extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  orderedQuantity: number;

  @ManyToOne(type => Product, product => product.orderDetails)
  product: Product;

  @ManyToOne(type => Order, order => order.orderDetails)
  order: Order;
}
