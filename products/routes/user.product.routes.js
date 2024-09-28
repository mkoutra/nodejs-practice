const express = require('express');
const router = express.Router();

const userProductController = require('../controllers/user.product.controller');

router.get('/users/products', userProductController.findUsersProducts);               // Find the products of all users.
router.get('/:username/products', userProductController.findUserProducts);          // Get the products of a specific user.
router.post('/:username/products', userProductController.insertUserProduct);        // Add product to user.
router.patch('/:username/products/:id', userProductController.updateUserProduct);   // Update a product for a user.
router.delete('/:username/products/:id', userProductController.deleteUserProduct);  // Delete a product from a user.

router.get('/stats1', userProductController.stats1);
router.get('/stats2', userProductController.stats2);
router.get('/:username/stats2', userProductController.userStats2);
module.exports = router;