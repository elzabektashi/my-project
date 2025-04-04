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
let Driver = class Driver {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Driver.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Driver.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Driver.prototype, "licenseNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Driver.prototype, "contact", void 0);
__decorate([
    ManyToOne(() => Company, (company) => company.drivers),
    __metadata("design:type", Company)
], Driver.prototype, "company", void 0);
Driver = __decorate([
    Entity()
], Driver);
export { Driver };
