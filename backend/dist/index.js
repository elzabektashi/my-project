import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;
AppDataSource.initialize()
    .then(() => {
    console.log("✅ Connected to database");
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
});
