require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", project: "venti" });
});

// Example route: list users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`venti API listening on port ${port}`);
});