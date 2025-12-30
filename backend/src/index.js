const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());
app.use(express.json());

// Prometheus metrics
client.collectDefaultMetrics();

// MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "app_db",
});

// Health checks
app.get("/health/live", (req, res) => {
    res.status(200).send("LIVE");
});

app.get("/health/ready", async (req, res) => {
    try {
        await db.promise().query("SELECT 1");
        res.status(200).send("READY");
    } catch {
        res.status(500).send("NOT READY");
    }
});

// Metrics
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.get("/users", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM users");
        res.json(rows); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});
