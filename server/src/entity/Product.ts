import {Entity, BaseEntity, JoinTable, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Category } from "./Category";
import { OrderDetails } from "./OrderDetails";
import { Comment } from './Comment';


@Entity({name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', default: null})
  title: string

  @Column({type: 'varchar', default: null})
  imageUrl: string

  @Column({type: 'text', default: null })
  description: string

  @Column('decimal', { precision: 15, scale: 2, default: null })
  price: number;

  @JoinTable({name: 'products_categories'})
  @ManyToMany(type => Category, category =>  category.products)
  categories: Category[]


  @OneToMany(type => OrderDetails, ordersProducts => ordersProducts.product)
  orderDetails: OrderDetails[]

  @OneToMany(type => Comment, comments => comments.product)
  comments: Comment[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
