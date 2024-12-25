const express = require('express');
const router = express.Router();
const {   
  createProductsHandler,
  getAllProductsHandler,
  getProductsHandler,
  deleteProductsHandler 
} = require('../../controllers/v1/productController');
const validateToken = require('../../middleware/auth');

router.post('', validateToken, createProductsHandler);
router.get('', getAllProductsHandler);
router.get('/:id', getProductsHandler);
router.delete('/:id', validateToken, deleteProductsHandler);

module.exports = router;