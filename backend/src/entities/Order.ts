import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./Company.js";
import { Driver } from "./Driver.js";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: string;

  @Column()
  destination!: string;

  @Column()
  status!: string;

  @Column({ name: "cargo_description" })
  cargoDescription!: string;

  @ManyToOne(() => Company, (company) => company.orders)
  company!: Company;

  @ManyToOne(() => Driver, (driver) => driver.orders)
  driver!: Driver;
}
