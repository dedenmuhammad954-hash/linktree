import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dns from "dns";

// Set DNS cache or use native fetch
const app = express();
const PORT = 3000;

app.use(express.json());

// API route to shorten URL using public APIs without CORS issues on the client side
app.get("/api/shorten", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Try shortening using TinyURL first
    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(tinyUrlApi);
    if (response.ok) {
      const shortUrl = await response.text();
      return res.json({ shortUrl });
    }

    // Fallback to is.gd
    const isGdApi = `https://is.gd/create.php?format=json&url=${encodeURIComponent(targetUrl)}`;
    const isGdResponse = await fetch(isGdApi);
    if (isGdResponse.ok) {
      const data = await isGdResponse.json() as { shorturl?: string; errorcode?: number; errormessage?: string };
      if (data.shorturl) {
        return res.json({ shortUrl: data.shorturl });
      }
    }

    throw new Error("Failed to shorten with both services");
  } catch (error) {
    console.error("Shortening error:", error);
    // If external service fails, return the original URL but notify the client
    return res.status(500).json({ 
      error: "Gagal memperpendek link secara otomatis. Silakan gunakan link asli.", 
      fallbackUrl: targetUrl 
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
