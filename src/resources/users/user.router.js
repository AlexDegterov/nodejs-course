const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler, catchError } = require('../../helpers/error');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const newUser = await usersService.addUser(new User(req.body));
      res.json(User.toResponse(newUser));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const userInfo = await usersService.getUserById(req.params.id);
      if (!userInfo) throw new ErrorHandler(404, 'User not found');
      res.status(200).json(User.toResponse(userInfo));
    })
  )
  .put(
    catchError(async (req, res) => {
      const resultUpdate = await usersService.updateUser(
        req.params.id,
        req.body
      );
      res.json(User.toResponse(resultUpdate));
    })
  )
  .delete(
    catchError(async (req, res) => {
      const resultDeleteUser = await usersService.deleteUser(req.params.id);
      if (!resultDeleteUser) throw new ErrorHandler(404, 'User not found');
      res.status(200).send(`User ${req.params.id} was deleted successfully`);
    })
  );

module.exports = router;
