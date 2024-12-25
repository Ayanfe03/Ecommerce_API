const express = require('express');
const { 
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
 } = require('../../controllers/v1/categoryController');
const validateToken = require('../../middleware/auth');

const router = express.Router();

router.post('', validateToken, createCategoryHandler);
router.get('', getAllCategoriesHandler);
router.get('/:id', getCategoryHandler);
router.put('/:id', validateToken, updateCategoryHandler);
router.delete('/:id', validateToken, deleteCategoryHandler);

module.exports = router;