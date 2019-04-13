import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, JoinTable, ManyToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

export enum roleName {
  Admin = 'Admin',
  User = 'User'
}

@Entity({ name: 'roles' })

export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: roleName

  @ManyToOne(type => User, user => user.roles )
  user: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
