const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const SECRET_KEY = process.env.SECRET_KEY || generateSecretKey();

module.exports = { SECRET_KEY };
