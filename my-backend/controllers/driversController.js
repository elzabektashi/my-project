const db = require("../db");

exports.getAllDrivers = (req, res) => {
  db.query("SELECT * FROM drivers", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getDriverById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM drivers WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Driver not found" });
    res.json(results[0]);
  });
};

exports.createDriver = (req, res) => {
  const { name, license_number, contact, company_id } = req.body;
  db.query(
    "INSERT INTO drivers (name, license_number, contact, company_id) VALUES (?, ?, ?, ?)",
    [name, license_number, contact, company_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({
          id: result.insertId,
          name,
          license_number,
          contact,
          company_id,
        });
    }
  );
};

exports.updateDriver = (req, res) => {
  const id = req.params.id;
  const { name, license_number, contact, company_id } = req.body;
  db.query(
    "UPDATE drivers SET name = ?, license_number = ?, contact = ?, company_id = ? WHERE id = ?",
    [name, license_number, contact, company_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Driver not found" });
      res.json({ message: "Driver updated successfully" });
    }
  );
};

exports.deleteDriver = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM drivers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Driver deleted successfully" });
  });
};
