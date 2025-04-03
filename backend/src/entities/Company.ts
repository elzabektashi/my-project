import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  contact!: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.company)
  vehicles!: Vehicle[];

  @OneToMany(() => Driver, (driver) => driver.company)
  drivers!: Driver[];
}
