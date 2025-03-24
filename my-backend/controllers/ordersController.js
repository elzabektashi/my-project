const db = require("../db");

exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getOrderById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM orders WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Order not found" });
    res.json(results[0]);
  });
};

exports.createOrder = (req, res) => {
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
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({
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

exports.updateOrder = (req, res) => {
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
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Order updated successfully" });
    }
  );
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  });
};
