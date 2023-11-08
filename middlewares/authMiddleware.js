const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: `authorization failed ${err.message}`,
          success: false,
        });
      } else {
        req.body.userID = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "authMiddleware falied" });
  }
};

module.exports = authMiddleware;
