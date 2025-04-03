import { Request, Response } from "express";
import db from "../db";
import { OkPacket, RowDataPacket } from "mysql2"; // ✅ from mysql2

// Get all companies
export const getAllCompanies = (req: Request, res: Response): void => {
  db.query("SELECT * FROM companies", (err: any, results: RowDataPacket[]) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get company by ID
export const getCompanyById = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query("SELECT * FROM companies WHERE id = ?", [id], (err: any, results: RowDataPacket[]) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Company not found" });
    res.json(results[0]);
  });
};

// Create a new company
export const createCompany = (req: Request, res: Response): void => {
  const { name, address, contact } = req.body;
  db.query(
    "INSERT INTO companies (name, address, contact) VALUES (?, ?, ?)",
    [name, address, contact],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        id: result.insertId,
        name,
        address,
        contact
      });
    }
  );
};

// Update an existing company
export const updateCompany = (req: Request, res: Response): void => {
  const id = req.params.id;
  const { name, address, contact } = req.body;
  db.query(
    "UPDATE companies SET name = ?, address = ?, contact = ? WHERE id = ?",
    [name, address, contact, id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Company not found" });
      res.json({ message: "Company updated successfully" });
    }
  );
};

// Delete a company
export const deleteCompany = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query("DELETE FROM companies WHERE id = ?", [id], (err: any, result: OkPacket) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  });
};
