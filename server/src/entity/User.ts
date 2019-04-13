import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Role } from './Role';
import { Order } from './Order';
import { Comment } from "./Comment";

@Entity({name: "users"})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  username: string;

  @Column({default: null, unique: true})
  email: string;

  @Column({default: null})
  address: string;

  @Column({default: null})
  phone: number;

  @Column({default: null})
  rating: number

  @Column({default: null})
  active: boolean

  @Column({default: null })
  picture: string;

  @Column({ select: false })
  password: string

  @Column({ select: false })
  salt: string

  @OneToMany(type => Role, role => role.user)
  roles: Role[]

  @OneToMany(type => Order, order => order.user)
  orders: Order[]

  @OneToMany(type => Comment, comments => comments.user)
  comments: Comment[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
