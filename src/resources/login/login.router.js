const router = require('express').Router();
const loginService = require('./login.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { logAuth } = require('../../common/logger');

router.route('/').post(async (req, res, next) => {
  try {
    // JSON.parse(req.body);
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

          const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
          logAuth(req.body.login, token, payload);

          res.status(200).send({ token });
        }
      });
    } else {
      const err = new Error('Incorrect login or password');
      err.status = 403;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
