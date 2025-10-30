import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Ambil route dari hasil build (dist/routes/chat.js)
const chatPath = pathToFileURL(path.resolve(__dirname, "./routes/chat.js")).href;
const chatRoutes = await import(chatPath);
app.use("/api", chatRoutes.default);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server jalan di http://localhost:${PORT}`));
console.log("API Key loaded?", !!process.env.GEMINI_API_KEY);
console.log("Running on port:", process.env.PORT);
