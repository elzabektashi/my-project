var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./Company.js";
import { Driver } from "./Driver.js";
import { Vehicle } from "./Vehicle.js";
let Order = class Order {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    Column({ type: "date" }),
    __metadata("design:type", String)
], Order.prototype, "date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "destination", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column({ name: "cargo_description" }),
    __metadata("design:type", String)
], Order.prototype, "cargoDescription", void 0);
__decorate([
    ManyToOne(() => Company, (company) => company.id),
    __metadata("design:type", Company)
], Order.prototype, "company", void 0);
__decorate([
    ManyToOne(() => Vehicle, (vehicle) => vehicle.id),
    __metadata("design:type", Vehicle)
], Order.prototype, "vehicle", void 0);
__decorate([
    ManyToOne(() => Driver, (driver) => driver.id),
    __metadata("design:type", Driver)
], Order.prototype, "driver", void 0);
Order = __decorate([
    Entity()
], Order);
export { Order };
