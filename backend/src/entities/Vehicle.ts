import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company.js";
import { Driver } from "./Driver.js";

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

  @ManyToOne(() => Driver, (driver) => driver.vehicles)
  driver!: Driver;
}
