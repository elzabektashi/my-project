import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company.js";
import { Order } from "./Order.js";
import { Vehicle } from "./Vehicle.js"; 

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  licenseNumber!: string;

  @Column()
  contact!: string;

  @ManyToOne(() => Company, (company) => company.drivers)
  company!: Company;

  @OneToMany(() => Order, (order) => order.driver)
  orders!: Order[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  vehicles!: Vehicle[];
}
