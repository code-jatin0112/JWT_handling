const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// 👉 Create HTTP server
const server = http.createServer(app);

// 👉 Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST"]
  }
});

// 👉 Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 👉 Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 👉 REST APIs (same as before)
app.get("/", (req, res) => {
  res.send("API working fine");
});

// 👉 IMPORTANT: use server.listen instead of app.listen
server.listen(5000, () => {
  console.log("Server running on port 5000");
});