const router = require('express').Router();
const loginService = require('./login.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await loginService.getLoginPasswordUser(req.body.login);
    if (user && req.body.login && req.body.password) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return next(err);
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user.id,
              login: user.login
            },
            process.env.JWT_SECRET_KEY,
            { algorithm: 'HS256' },
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).send({ token });
        }
      });
    } else {
      const errors = new Error('User not found');
      errors.status = 403;
      return next(errors);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
