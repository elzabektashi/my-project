import { Router } from "express";
import { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, } from "../controllers/companiesController.js";
const router = Router();
// Explicitly annotate controller types
router.get("/", (req, res) => getAllCompanies(req, res));
router.get("/:id", (req, res) => getCompanyById(req, res));
router.post("/", (req, res) => createCompany(req, res));
router.put("/:id", (req, res) => updateCompany(req, res));
router.delete("/:id", (req, res) => deleteCompany(req, res));
export default router;
