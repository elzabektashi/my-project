import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import companiesRoutes from "./routes/companies.js";
import vehiclesRoutes from "./routes/vehicles.js";
import ordersRoutes from "./routes/orders.js";
import driversRoutes from "./routes/drivers.js";

import authRoutes from "./routes/auth"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);


app.use("/companies", companiesRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/orders", ordersRoutes);
app.use("/drivers", driversRoutes);

app.get("/", (req, res) => {
  res.send("🚚 Logistics API is running!");
});

export default app;
