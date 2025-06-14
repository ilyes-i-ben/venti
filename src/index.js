require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const app = express();
// proxy import
const proxy = require("./gateway/proxy");
const { authorizeRoles, authenticateJWT } = require("./middleware/auth");


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", project: "venti" });
});

app.use("/auth", authRouter);
app.use("", adminRouter);

proxy(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`venti API listening on port ${port}`);
});