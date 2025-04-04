import { AppDataSource } from "../data-source.js";
import { Company } from "../entities/Company.js";
// GET /companies
export const getAllCompanies = async (req, res) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const companies = await companyRepo.find();
    res.json(companies);
};
// GET /companies/:id
export const getCompanyById = async (req, res) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const company = await companyRepo.findOneBy({ id: Number(req.params.id) });
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
};
// POST /companies
export const createCompany = async (req, res) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const newCompany = companyRepo.create(req.body);
    const result = await companyRepo.save(newCompany);
    res.status(201).json(result);
};
// PUT /companies/:id
export const updateCompany = async (req, res) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const existing = await companyRepo.findOneBy({ id: Number(req.params.id) });
    if (!existing) {
        return res.status(404).json({ message: "Company not found" });
    }
    companyRepo.merge(existing, req.body);
    const result = await companyRepo.save(existing);
    res.json(result);
};
// DELETE /companies/:id
export const deleteCompany = async (req, res) => {
    const companyRepo = AppDataSource.getRepository(Company);
    const result = await companyRepo.delete(req.params.id);
    if (result.affected === 0) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted successfully" });
};
