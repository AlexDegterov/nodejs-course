const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const newUser = await usersService.addUser(new User(req.body));
    res.json(User.toResponse(newUser));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const userInfo = await usersService.getUserById(req.params.id);
    res.json(User.toResponse(userInfo));
  })
  .put(async (req, res) => {
    const resultUpdate = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(resultUpdate));
  })
  .delete(async (req, res) => {
    const resultDeleteUser = await usersService.deleteUser(req.params.id);
    res.json(resultDeleteUser);
  });

module.exports = router;
