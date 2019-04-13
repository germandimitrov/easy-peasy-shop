import { Entity, PrimaryGeneratedColumn, BaseEntity, Column,  ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { OrdersProducts } from "./OrdersProducts";

@Entity({ name: 'orders' })

export class Order extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.orders)
  user: User

  @OneToMany(type => OrdersProducts, ordersProducts => ordersProducts.order)
  ordersProducts: OrdersProducts

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
