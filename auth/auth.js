const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
