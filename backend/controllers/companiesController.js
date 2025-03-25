const db = require("../db");

exports.getAllCompanies = (req, res) => {
  db.query("SELECT * FROM companies", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getCompanyById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM companies WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Company not found" });
    res.json(results[0]);
  });
};

exports.createCompany = (req, res) => {
  const { name, address, contact } = req.body;
  db.query(
    "INSERT INTO companies (name, address, contact) VALUES (?, ?, ?)",
    [name, address, contact],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, address, contact });
    }
  );
};

exports.updateCompany = (req, res) => {
  const id = req.params.id;
  const { name, address, contact } = req.body;
  db.query(
    "UPDATE companies SET name = ?, address = ?, contact = ? WHERE id = ?",
    [name, address, contact, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Company not found" });
      res.json({ message: "Company updated successfully" });
    }
  );
};

exports.deleteCompany = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM companies WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  });
};