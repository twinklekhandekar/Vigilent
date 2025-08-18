const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using same secret as login
    const decoded = jwt.verify(token, 'jwt_secret');

    // Attach the decoded user ID to the request object
    req.user ={id: decoded.id };

    next();
  } catch (err) {
    console.error('Auth Middleware error:', err.message);
    // Provide a more informative message
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;

