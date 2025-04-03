import { Request, Response } from "express";
import db from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

// Get all orders
export const getAllOrders = (req: Request, res: Response): void => {
  db.query("SELECT * FROM orders", (err: any, results: RowDataPacket[]) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get order by ID
export const getOrderById = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM orders WHERE id = ?",
    [id],
    (err: any, results: RowDataPacket[]) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "Order not found" });
      res.json(results[0]);
    }
  );
};

// Create a new order
export const createOrder = (req: Request, res: Response): void => {
  const {
    order_date,
    destination,
    cargo_description,
    company_id,
    vehicle_id,
    driver_id,
  } = req.body;

  db.query(
    "INSERT INTO orders (order_date, destination, cargo_description, company_id, vehicle_id, driver_id) VALUES (?, ?, ?, ?, ?, ?)",
    [
      order_date,
      destination,
      cargo_description,
      company_id,
      vehicle_id,
      driver_id,
    ],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        id: result.insertId,
        order_date,
        destination,
        cargo_description,
        company_id,
        vehicle_id,
        driver_id,
      });
    }
  );
};

// Update an existing order
export const updateOrder = (req: Request, res: Response): void => {
  const id = req.params.id;
  const {
    order_date,
    destination,
    cargo_description,
    company_id,
    vehicle_id,
    driver_id,
  } = req.body;

  db.query(
    "UPDATE orders SET order_date = ?, destination = ?, cargo_description = ?, company_id = ?, vehicle_id = ?, driver_id = ? WHERE id = ?",
    [
      order_date,
      destination,
      cargo_description,
      company_id,
      vehicle_id,
      driver_id,
      id,
    ],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Order updated successfully" });
    }
  );
};

// Delete an order
export const deleteOrder = (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query(
    "DELETE FROM orders WHERE id = ?",
    [id],
    (err: any, result: OkPacket) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Order deleted successfully" });
    }
  );
};
