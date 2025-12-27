import app from "../backend/src/app";

// Debug incoming requests
app.use((req, res, next) => {
    console.log(`[Bridge] ${req.method} ${req.url}`);
    next();
});

// Check environment variables at startup
if (!process.env.MONGO_URI) {
    console.warn("⚠️ Warning: MONGO_URI is not set in environment variables!");
}
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ Warning: JWT_SECRET is not set in environment variables!");
}

// Direct health check to bypass any backend export issues
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Vercel Bridge is Active",
        db: !!process.env.MONGO_URI,
        auth: !!process.env.JWT_SECRET
    });
});

export default app;
