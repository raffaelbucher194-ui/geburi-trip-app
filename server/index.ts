import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // In Render production, files are in dist/public/
  // But let's try multiple locations
  const possiblePaths = [
    path.join(__dirname, "..", "dist", "public"),  // Most likely
    path.join(__dirname, "..", "dist"),            // Fallback
    path.join(__dirname, "..", "client", "dist")   // Dev fallback
  ];
  
  let staticPath = possiblePaths[0];
  const fs = await import("fs");
  
  // Find which path actually exists
  for (const testPath of possiblePaths) {
    if (fs.existsSync(testPath)) {
      staticPath = testPath;
      console.log(`✅ Found static files at: ${testPath}`);
      break;
    }
  }
  
  console.log(`📁 Using static path: ${staticPath}`);
  
  // Try to list files for debugging
  try {
    const files = fs.readdirSync(staticPath);
    console.log(`📄 Files in ${staticPath}:`, files);
  } catch (err) {
    console.log(`❌ Cannot read directory ${staticPath}:`, err.message);
  }
  
  app.use(express.static(staticPath));
  
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    console.log(`📤 Attempting to serve: ${indexPath}`);
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error(`❌ index.html not found at: ${indexPath}`);
      
      // Try to find index.html in subdirectories
      try {
        const findIndexFile = (dir: string): string | null => {
          const items = fs.readdirSync(dir, { withFileTypes: true });
          for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
              const found = findIndexFile(fullPath);
              if (found) return found;
            } else if (item.name === 'index.html') {
              return fullPath;
            }
          }
          return null;
        };
        
        const foundIndex = findIndexFile(staticPath);
        if (foundIndex) {
          console.log(`✅ Found index.html at: ${foundIndex}`);
          res.sendFile(foundIndex);
        } else {
          res.status(404).send(`
            <h1>File Not Found</h1>
            <p>Looking in: ${staticPath}</p>
            <p>Build output directory issue. Check Render logs.</p>
          `);
        }
      } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
      }
    }
  });
  
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`);
    console.log(`🌐 Public URL: https://geburi-trip-app.onrender.com`);
  });
}

startServer().catch(console.error);