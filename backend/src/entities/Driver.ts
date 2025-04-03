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
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: "license_number" })
  licenseNumber!: string;

  @Column()
  contact!: string;

  @ManyToOne(() => Company, (company) => company.drivers)
  company!: Company;

  @OneToMany(() => Order, (order) => order.driver)
  orders!: Order[];
}
