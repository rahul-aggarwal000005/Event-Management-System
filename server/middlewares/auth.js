const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error();
    }
    const decodedToken = await jwt.verify(token, jwtSecret);
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(500).json({ message: "Not authorized" });
  }
};

exports.isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error();
    }
    const decodedToken = await jwt.verify(token, jwtSecret);
    if (decodedToken.role !== "admin") {
      throw new Error("Only admin has the access to this route");
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Not authorized" });
  }
};

exports.isNotAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      throw new Error("Already logged In.");
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Not authorized" });
  }
};
