// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the correct location
const staticPath = process.env.NODE_ENV === "production" 
  ? path.join(__dirname, "..", "dist")  // Built React files
  : path.join(__dirname, "..", "client", "dist"); // Dev build

app.use(express.static(staticPath));

// All routes go to React app
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Serving from: ${staticPath}`);
});
