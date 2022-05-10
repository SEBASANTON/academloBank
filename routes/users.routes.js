const express = require('express');

const { userExists } = require('../middlewares/users.middlewares');

const {
  getAllUsers,
  createUser,
  loginUser,
  historyById
} = require('../controllers/users.controller');

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/signup').post(createUser);

router.route('/login').post(loginUser);

router.route('/:id/history').get(userExists, historyById);

module.exports = { usersRouter: router };
