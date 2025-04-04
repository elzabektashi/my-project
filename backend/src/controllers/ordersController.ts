import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Order } from "../entities/Order.js";

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const orders = await orderRepo.find({
    relations: ["company", "vehicle", "driver"],
  });
  res.json(orders);
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const order = await orderRepo.findOne({
    where: { id: Number(req.params.id) },
    relations: ["company", "vehicle", "driver"],
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const {
    order_date,
    destination,
    cargo_description,
    company_id,
    vehicle_id,
    driver_id,
  } = req.body;

  const newOrder = orderRepo.create({
    date: order_date,
    destination,
    cargoDescription: cargo_description,
    company: { id: company_id },
    vehicle: { id: vehicle_id },
    driver: { id: driver_id },
    status: "Pending", // default status if needed
  });

  const saved = await orderRepo.save(newOrder);
  res.status(201).json(saved);
};

// Update an existing order
export const updateOrder = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const id = Number(req.params.id);
  const existing = await orderRepo.findOneBy({ id });

  if (!existing) {
    return res.status(404).json({ message: "Order not found" });
  }

  const {
    order_date,
    destination,
    cargo_description,
    company_id,
    vehicle_id,
    driver_id,
    status,
  } = req.body;

  orderRepo.merge(existing, {
    date: order_date,
    destination,
    cargoDescription: cargo_description,
    company: { id: company_id },
    vehicle: { id: vehicle_id },
    driver: { id: driver_id },
    status,
  });

  const updated = await orderRepo.save(existing);
  res.json(updated);
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const id = Number(req.params.id);

  const result = await orderRepo.delete(id);
  if (result.affected === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({ message: "Order deleted successfully" });
};
