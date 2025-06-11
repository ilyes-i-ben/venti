require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", project: "venti" });
});

app.use("/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`venti API listening on port ${port}`);
});