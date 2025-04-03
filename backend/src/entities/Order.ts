import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./Company";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

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

  @ManyToOne(() => Company, (company) => company.id)
  company!: Company;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle!: Vehicle;

  @ManyToOne(() => Driver, (driver) => driver.id)
  driver!: Driver;
}
