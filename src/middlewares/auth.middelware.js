const jwt = require("jsonwebtoken");

function authuser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      "a89109226fbd050fa8f941a56b4ce1861aeba81f8d5d6dea19fbc93584436a15",
    );

    console.log("DECODED:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "invalid token",
    });
  }
}

module.exports = { authuser };
