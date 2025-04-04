import { AppDataSource } from "../data-source.js";
import { Vehicle } from "../entities/Vehicle.js";
// Get all vehicles
export const getAllVehicles = async (req, res) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const vehicles = await vehicleRepo.find({
        relations: ["company"],
    });
    res.json(vehicles);
};
// Get vehicle by ID
export const getVehicleById = async (req, res) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const vehicle = await vehicleRepo.findOne({
        where: { id: Number(req.params.id) },
        relations: ["company"],
    });
    if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
};
// Create a new vehicle
export const createVehicle = async (req, res) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const { model, capacity, status, company_id } = req.body;
    const newVehicle = vehicleRepo.create({
        model,
        capacity,
        status,
        company: { id: company_id },
    });
    const saved = await vehicleRepo.save(newVehicle);
    res.status(201).json(saved);
};
// Update an existing vehicle
export const updateVehicle = async (req, res) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const id = Number(req.params.id);
    const existing = await vehicleRepo.findOneBy({ id });
    if (!existing) {
        return res.status(404).json({ message: "Vehicle not found" });
    }
    const { model, capacity, status, company_id } = req.body;
    vehicleRepo.merge(existing, {
        model,
        capacity,
        status,
        company: { id: company_id },
    });
    const updated = await vehicleRepo.save(existing);
    res.json(updated);
};
// Delete a vehicle
export const deleteVehicle = async (req, res) => {
    const vehicleRepo = AppDataSource.getRepository(Vehicle);
    const id = Number(req.params.id);
    const result = await vehicleRepo.delete(id);
    if (result.affected === 0) {
        return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
};
