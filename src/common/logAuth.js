const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) return res.status(401).send('Unauthorized user');
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') return res.status(401).send('Unauthorized user');

  try {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(401);
      req.user = decoded;
      next();
    });
  } catch (e) {
    res.status(401).send('Unauthorized user');
  }
};
