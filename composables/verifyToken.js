const jwt = require("jsonwebtoken");

function verifyToken(token) {
  const tokenPayload = jwt.verify(token, process.env.jwt_hash);
  return tokenPayload;
}

module.exports = verifyToken;
