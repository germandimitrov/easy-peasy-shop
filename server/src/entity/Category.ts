import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Product } from "./Product";

@Entity({name: 'categories' })
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', default: null})
  name: string

  @ManyToMany(type => Product, product =>  product.categories)
  products: Product[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
