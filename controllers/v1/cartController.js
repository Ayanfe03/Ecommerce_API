const CartItem = require('../../models/cartItem');
const Product = require('../../models/Product')
const User = require('../../models/User');

const addItemToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, productQuantity} = req.body;

  if (!productId || !productQuantity || productQuantity <= 0) {
    return res.status(400).json({
      message: 'Invalid Product or Quantity',
    });
  }

  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    })
  }
  // check if the found product still has available quantity using the productNumber and productSoldOut fields in the Product model
  if (product.productNumber < productQuantity || product.productSoldOut) {
    return res.status(400).json({
      message: 'Product not available',
    });
  }

  // if the product is found and has available quantity, create and save it to the cart with the productQuantity requested for
  const cartItem = await CartItem.create({
    userId,
    productId,
    productQuantity,
  });

  // now update the productNumber field in the Product model to reflect the new quantity after the product has been added to the cart
  await product.update({
    productNumber: product.productNumber - productQuantity,
  });

  return res.status(201).json({
    message: 'Product added to cart',
    cartItem,
  }); 
}

// remove items from cart
const removeItemFromCart = async (req, res) => {
  const cartItemId = req.params.cartItemId;

  const cartItem = await CartItem.findByPk(cartItemId);
  if (!cartItem) {
    return res.status(404).json({
      message: 'Cart item not found',
    });
  }

  await cartItem.destroy();

  return res.status(200).json({
    message: 'Cart item removed',
  });
}


// export this function to be used in the routes
module.exports = {
  addItemToCart,
};