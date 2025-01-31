const express = require('express');
const router = express.Router();
const { 
  createBuyerHandler,
  createSellerHandler,
  updatedUserHandler,
  loginUserHandler,
} = require('../../controllers/v1/userController');
const validateToken = require('../../middleware/auth');

router.post('/buyer', createBuyerHandler);
router.post('/seller', createSellerHandler);
router.put('/:id', validateToken, updatedUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;