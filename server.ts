import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add a proxy endpoint for camera streams
  app.get("/api/proxy/stream", (req, res) => {
    // In a real application, you would connect to the actual RTSP or camera URL
    // and proxy the stream to handle authentication, CORS, or format conversion.
    const targetUrl = req.query.url as string;
    
    if (!targetUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // For demonstration, we simply redirect to the target URL.
    // A robust proxy would use something like `http-proxy-middleware` or `node-fetch`.
    res.redirect(targetUrl);
  });

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
