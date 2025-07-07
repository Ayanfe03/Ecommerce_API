const express = require('express');
const { addItemToCart, removeItemFromCart } = require('../../controllers/v1/cartController');
const router = express.Router();
const validateToken = require('../../middleware/auth');

router.post('/:userId/:productId', validateToken, addItemToCart);
router.put('/:userId/:cartItemId', validateToken, removeItemFromCart);

module.exports = router;




