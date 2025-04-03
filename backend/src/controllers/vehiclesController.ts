import { Request, Response } from "express";
import db from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

// Get all vehicles
export const getAllVehicles = (req: Request, res: Response): void => {
  db.query("SELECT * FROM vehicles", (err: any, results: RowDataPacket[]) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get vehicle by ID
export const getVehicleById = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM vehicles WHERE id = ?",
    [id],
    (err: any, results: RowDataPacket[]) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "Vehicle not found" });
      res.json(results[0]);
    }
  );
};

// Create a new vehicle
export const createVehicle = (req: Request, res: Response): void => {
  const { license_plate, model, capacity, status, company_id } = req.body;
  db.query(
    "INSERT INTO vehicles (license_plate, model, capacity, status, company_id) VALUES (?, ?, ?, ?, ?)",
    [license_plate, model, capacity, status, company_id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        id: result.insertId,
        license_plate,
        model,
        capacity,
        status,
        company_id,
      });
    }
  );
};

// Update an existing vehicle
export const updateVehicle = (req: Request, res: Response): void => {
  const id = req.params.id;
  const { license_plate, model, capacity, status, company_id } = req.body;
  db.query(
    "UPDATE vehicles SET license_plate = ?, model = ?, capacity = ?, status = ?, company_id = ? WHERE id = ?",
    [license_plate, model, capacity, status, company_id, id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Vehicle not found" });
      res.json({ message: "Vehicle updated successfully" });
    }
  );
};

// Delete a vehicle
export const deleteVehicle = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "DELETE FROM vehicles WHERE id = ?",
    [id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Vehicle not found" });
      res.json({ message: "Vehicle deleted successfully" });
    }
  );
};
