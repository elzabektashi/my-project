// ✅ controllers/vehiclesController.js
const db = require("../db");

exports.getAllVehicles = (req, res) => {
  db.query("SELECT * FROM vehicles", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getVehicleById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM vehicles WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Vehicle not found" });
    res.json(results[0]);
  });
};

exports.createVehicle = (req, res) => {
  const { license_plate, model, capacity, status, company_id } = req.body;
  db.query(
    "INSERT INTO vehicles (license_plate, model, capacity, status, company_id) VALUES (?, ?, ?, ?, ?)",
    [license_plate, model, capacity, status, company_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({
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

exports.updateVehicle = (req, res) => {
  const id = req.params.id;
  const { license_plate, model, capacity, status, company_id } = req.body;
  db.query(
    "UPDATE vehicles SET license_plate = ?, model = ?, capacity = ?, status = ?, company_id = ? WHERE id = ?",
    [license_plate, model, capacity, status, company_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Vehicle not found" });
      res.json({ message: "Vehicle updated successfully" });
    }
  );
};

exports.deleteVehicle = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM vehicles WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted successfully" });
  });
};
