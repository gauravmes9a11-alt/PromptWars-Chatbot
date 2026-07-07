// Local development server so `/api/*` works the same way it will on Vercel
// (Vercel auto-builds serverless functions from the /api directory in prod).
import express from "express";
import chatHandler from "../api/chat.js";
import briefHandler from "../api/brief.js";

const app = express();
app.use(express.json());

app.post("/api/chat", (req, res) => chatHandler(req, res));
app.post("/api/brief", (req, res) => briefHandler(req, res));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Dev API server listening on http://localhost:${PORT}`));
