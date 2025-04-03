import { Request, Response } from "express";
import db from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

// Get all drivers
export const getAllDrivers = (req: Request, res: Response): void => {
  db.query("SELECT * FROM drivers", (err: any, results: RowDataPacket[]) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get driver by ID
export const getDriverById = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM drivers WHERE id = ?",
    [id],
    (err: any, results: RowDataPacket[]) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "Driver not found" });
      res.json(results[0]);
    }
  );
};

// Create a new driver
export const createDriver = (req: Request, res: Response): void => {
  const { name, license_number, contact, company_id } = req.body;
  db.query(
    "INSERT INTO drivers (name, license_number, contact, company_id) VALUES (?, ?, ?, ?)",
    [name, license_number, contact, company_id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        id: result.insertId,
        name,
        license_number,
        contact,
        company_id,
      });
    }
  );
};

// Update an existing driver
export const updateDriver = (req: Request, res: Response): void => {
  const id = req.params.id;
  const { name, license_number, contact, company_id } = req.body;
  db.query(
    "UPDATE drivers SET name = ?, license_number = ?, contact = ?, company_id = ? WHERE id = ?",
    [name, license_number, contact, company_id, id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Driver not found" });
      res.json({ message: "Driver updated successfully" });
    }
  );
};

// Delete a driver
export const deleteDriver = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "DELETE FROM drivers WHERE id = ?",
    [id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Driver not found" });
      res.json({ message: "Driver deleted successfully" });
    }
  );
};
