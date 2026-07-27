const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(cors({
  origin: [
    "https://monday-bi-agent-lake.vercel.app",
    "http://localhost:5173"
  ],
  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Monday BI Agent API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});