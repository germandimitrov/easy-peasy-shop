import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'comments' })
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', default: null})
  content: string

  @Column({default: null})
  rating: number

  @Column({ default: null })
  rated: boolean

  @ManyToOne(type => Product, product =>  product.comments)
  product: Product

  @ManyToOne(type => User, user =>  user.comments)
  user: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
