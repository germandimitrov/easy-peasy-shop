import { Entity, PrimaryGeneratedColumn, BaseEntity, Column,  ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { OrderDetails } from "./OrderDetails";

export enum Status {
  Unprocessed = 1,
  Processed = 2
}

@Entity({ name: 'orders' })

export class Order extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Unprocessed,
  })
  status: Status

  @ManyToOne(type => User, user => user.orders)
  user: User

  @OneToMany(type => OrderDetails, orderDetails => orderDetails.order)
  orderDetails: OrderDetails[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
