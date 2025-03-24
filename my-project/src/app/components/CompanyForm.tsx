"use client";

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

interface Props {
  onCompanyCreated: () => void;
}

export default function CompanyForm({ onCompanyCreated }: Props) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/companies", form);
    setForm({ name: "", address: "", contact: "" });
    onCompanyCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contact"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Company
      </Button>
    </Box>
  );
}
