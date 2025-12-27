import app from "../backend/src/app";

// Direct health check to bypass any backend export issues
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Vercel Bridge is Active" });
});

export default app;
