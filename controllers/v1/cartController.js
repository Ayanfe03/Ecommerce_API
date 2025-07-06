const CartItem = require('../../models/cartItem');
const Product = require('../../models/Product')
const User = require('../../models/User');

const addItemToCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const productQuantity = Number(req.body.productQuantity);

  if (isNaN(productQuantity) || productQuantity <= 0) {
    return res.status(400).json({
      message: 'Invalid Quantity',
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
  if (productQuantity > product.productNumber || product.productSoldOut) {
    return res.status(400).json({
      message: 'Requested quantity exceeds stock',
    });
  }


  // now update the productNumber field in the Product model to reflect the new quantity after the product has been added to the cart
  // await product.update({
  //   productNumber: product.productNumber - productQuantity,
  // });

  const [cartItem, wasCreated] = await CartItem.findOrCreate({
    where: {
      userId,
      productId
    },
    defaults: {
      productQuantity,
    }
  });

  if (!wasCreated) {
    if (productQuantity <= product.productNumber) {
      console.log("Product Number")
      cartItem.productQuantity = Number(cartItem.productQuantity);
      cartItem.productQuantity += productQuantity;
      await product.update({
        productNumber: product.productNumber - productQuantity,
      })
      await cartItem.save();
    } else {
      return res.status(400).json({
        message: "Product is not available",
      })
    }
}

  return res.status(201).json({
    message: 'Product added to cart',
    cartItem,
  }); 
}

// remove items from cart
// const removeItemFromCart = async (req, res) => {
//   const cartItemId = req.params.cartItemId;

//   const cartItem = await CartItem.findByPk(cartItemId);
//   if (!cartItem) {
//     return res.status(404).json({
//       message: 'Cart item not found',
//     });
//   }

//   await cartItem.destroy();

//   return res.status(200).json({
//     message: 'Cart item removed',
//   });
// }


// export this function to be used in the routes
module.exports = {
  addItemToCart,
};