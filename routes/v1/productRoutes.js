const express = require('express');
const router = express.Router();
const {   
  createProductsHandler,
  getAllProductsHandler,
  getProductsHandler,
  markProductSoldOut,
  updateProductStock,
  deleteProductsHandler 
} = require('../../controllers/v1/productController');
const validateToken = require('../../middleware/auth');

router.post('', validateToken, createProductsHandler);
router.get('', getAllProductsHandler);
router.get('/:id', getProductsHandler);
router.put('/sold/:id', validateToken, markProductSoldOut);
router.put('/stock/:id', validateToken, updateProductStock);
router.delete('/:id', validateToken, deleteProductsHandler);

module.exports = router;