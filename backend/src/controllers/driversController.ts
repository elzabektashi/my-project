import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Driver } from "../entities/Driver.js";

// Get all drivers
export const getAllDrivers = async (req: Request, res: Response) => {
  const driverRepo = AppDataSource.getRepository(Driver);
  const drivers = await driverRepo.find({
    relations: ["company"],
  });
  res.json(drivers);
};

// Get driver by ID
export const getDriverById = async (req: Request, res: Response) => {
  const driverRepo = AppDataSource.getRepository(Driver);
  const driver = await driverRepo.findOne({
    where: { id: Number(req.params.id) },
    relations: ["company"],
  });

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  res.json(driver);
};

// Create a new driver
export const createDriver = async (req: Request, res: Response) => {
  const driverRepo = AppDataSource.getRepository(Driver);

  const { name, license_number, contact, company_id } = req.body;
  const newDriver = driverRepo.create({
    name,
    licenseNumber: license_number,
    contact,
    company: { id: company_id },
  });

  const savedDriver = await driverRepo.save(newDriver);
  res.status(201).json(savedDriver);
};

// Update an existing driver
export const updateDriver = async (req: Request, res: Response) => {
  const driverRepo = AppDataSource.getRepository(Driver);
  const id = Number(req.params.id);

  const existing = await driverRepo.findOneBy({ id });

  if (!existing) {
    return res.status(404).json({ message: "Driver not found" });
  }

  const { name, license_number, contact, company_id } = req.body;

  driverRepo.merge(existing, {
    name,
    licenseNumber: license_number,
    contact,
    company: { id: company_id },
  });

  const updatedDriver = await driverRepo.save(existing);
  res.json(updatedDriver);
};

// Delete a driver
export const deleteDriver = async (req: Request, res: Response) => {
  const driverRepo = AppDataSource.getRepository(Driver);
  const id = Number(req.params.id);

  const result = await driverRepo.delete(id);

  if (result.affected === 0) {
    return res.status(404).json({ message: "Driver not found" });
  }

  res.json({ message: "Driver deleted successfully" });
};
