const express = require('express');

const router = express.Router();
const userController = require('../controller/usersController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;
