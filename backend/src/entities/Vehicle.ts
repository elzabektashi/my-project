import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company";
import { Order } from "./Order";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model!: string;

  @Column()
  capacity!: number;

  @Column()
  status!: string;

  @ManyToOne(() => Company, (company) => company.vehicles)
  company!: Company;

  @OneToMany(() => Order, (order) => order.vehicle)
  orders!: Order[];
}
