const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();
const SECRET_KEY = "issa";

const authenticateToken = async (req, res, next) => {
  // const token = req.headers.cookie;
  // const auth = token.split("=")[1].trim();
  // console.log(req.body);
  try {
    const token = req.headers.authorization;
    console.log("😜😜😜😜", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "You need to login first" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded.user_id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = decoded.user_id;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateToken };
