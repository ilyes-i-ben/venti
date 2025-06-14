const express = require("express");
const { authenticateJWT, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get(
  "/secret-data",
  authenticateJWT,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "This is admin-only data!" });
});

module.exports = router;