import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// In production, React builds to dist/public/
const staticPath = path.join(__dirname, "..", "dist", "public");

console.log(`📁 Static path: ${staticPath}`);
console.log(`📁 Directory contents:`, require("fs").readdirSync(path.join(__dirname, "..", "dist")));

app.use(express.static(staticPath));

// All routes go to React app
app.get("*", (_req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  console.log(`📄 Serving: ${indexPath}`);
  
  // Check if file exists
  const fs = require("fs");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error(`❌ File not found: ${indexPath}`);
    res.status(404).send("React build files not found. Check build output.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});