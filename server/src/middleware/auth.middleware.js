import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers;
  // console.log("headerrrrrrrr",authHeader)

  if (!authHeader) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  const token = authHeader.accesstoken
  console.log("tokennn",token)

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};
