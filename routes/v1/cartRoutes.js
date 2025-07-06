const express = require('express');
const { addItemToCart } = require('../../controllers/v1/cartController');
const router = express.Router();
const validateToken = require('../../middleware/auth');

router.post('/:userId/:productId', validateToken, addItemToCart);

module.exports = router;




