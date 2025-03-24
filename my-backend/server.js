require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/companies", require("./routes/companies"));
// Add vehicles, drivers, orders similarly

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
