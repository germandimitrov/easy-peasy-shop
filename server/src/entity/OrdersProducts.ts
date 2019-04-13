import { Entity, PrimaryGeneratedColumn, BaseEntity, Column,  ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({ name: 'orders_products' })

export class OrdersProducts extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  orderedQuantity: number;

  @ManyToOne(type => Product, product => product.ordersProducts, )
  product: Product;

  @ManyToOne(type => Order, order => order.ordersProducts)
  order: Order;
}
