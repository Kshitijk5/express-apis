import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header.

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.name);

      return res.status(401).json({ message: "Invalid token." });
    }

    // If token is valid, attach the decoded token to the request object for use in subsequent routes.
    req.user = decodedToken;
    next();
  });
};
