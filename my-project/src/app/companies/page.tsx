"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import CompanyForm from "../components/CompanyForm";

interface Company {
  id: number;
  name: string;
  address: string;
  contact: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = async () => {
    const res = await axios.get("http://localhost:3001/companies");
    setCompanies(res.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/companies/${id}`);
    fetchCompanies();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>

      <CompanyForm onCompanyCreated={fetchCompanies} />

      <Paper sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.contact}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
