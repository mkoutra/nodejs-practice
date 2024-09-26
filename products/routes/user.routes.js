const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Path for the following method: /api/user
router.get('/', userController.findAll);

// An example path for the following method: /api/user/bob
router.get('/:username', userController.findOne);

// Insert user
router.post('/', userController.create);

// Update user
router.patch('/:username', userController.update);

// Delete user
router.delete('/:username', userController.delete);

module.exports = router;