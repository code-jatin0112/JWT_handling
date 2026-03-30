// backend/server.js (quick test server)
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = "devsecret"; // use .env in real projects

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  // For test: accept any password (do not do this in production)
  if (!email || !password) return res.status(400).json({ message: "Missing" });
  const token = jwt.sign({ email, name: email.split("@")[0] }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: { email, name: email.split("@")[0] } });
});

app.get("/api/protected/profile", (req, res) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Protected", user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(5000, ()=>console.log("API on 5000"));