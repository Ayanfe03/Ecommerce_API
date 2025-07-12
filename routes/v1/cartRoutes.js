const express = require('express');
const { addItemToCart, removeItemFromCart, viewCartItems, viewCartItem } = require('../../controllers/v1/cartController');
const router = express.Router();
const validateToken = require('../../middleware/auth');

router.post('/:userId/:productId', validateToken, addItemToCart);
router.put('/:userId/:cartItemId', validateToken, removeItemFromCart);
router.get('/:userId', validateToken, viewCartItems);
router.get('/:userId/:cartItemId', validateToken, viewCartItem);

module.exports = router;




