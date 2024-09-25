const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Path for the following method: /api/user
router.get('/', userController.findAll);

// An example path for the following method: /api/user/bob
router.get('/:username', userController.findOne);

module.exports = router;