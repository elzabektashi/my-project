import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import companiesRoutes from "./routes/companies";
import vehiclesRoutes from "./routes/vehicles";
import ordersRoutes from "./routes/orders";
import driversRoutes from "./routes/drivers";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/companies", companiesRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/orders", ordersRoutes);
app.use("/drivers", driversRoutes);

app.get("/", (req, res) => {
  res.send("🚚 Logistics API is running!");
});

export default app;
