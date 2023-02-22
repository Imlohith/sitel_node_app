const express = require('express');
const router = express.Router();
const usersController = require('../controller/user.controller')

router.post('/users', usersController.addUser);
router.get('/users/:id', usersController.fetchUser);
router.post('/users/:id', usersController.deleteUser);

module.exports = router;
