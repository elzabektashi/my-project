const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/companies", require("./routes/companies"));
app.use("/vehicles", require("./routes/vehicles"));
app.use("/drivers", require("./routes/drivers"));
app.use("/orders", require("./routes/orders"));

app.get("/", (req, res) => {
  res.send("🚚 Logistics API is running! Use /companies to manage companies.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
