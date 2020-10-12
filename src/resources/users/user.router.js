const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) res.status(200).send(User.toResponse(user));
  else res.sendStatus(400);
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  await usersService.create(user);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = {
    ...req.body,
    id: req.params.id
  };
  const isUpdated = await usersService.update(user);
  if (isUpdated) res.status(200).send(User.toResponse(user));
  else res.sendStatus(400);
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.remove(req.params.id);
  if (user) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
