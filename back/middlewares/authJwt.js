const jwt = require("jsonwebtoken");
const { SECRET } = require("../config.js");
const User = require("../models/user.model.js");

exports.verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};


exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if(user.role == "admin"){
      next();
      return;
    }else{
      return res.status(403).json({ message: "Require Admin Role!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
