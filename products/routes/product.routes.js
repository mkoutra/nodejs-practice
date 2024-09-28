const express = require('express');
const router = express.Router();

const productsController = require('../controllers/product.controller');
const { models } = require('mongoose');

router.get("/", productsController.findAllProducts);
router.get('/:id', productsController.findOneProduct);
// router.post('');
// router.delete();
// router.patch();

module.exports = router;