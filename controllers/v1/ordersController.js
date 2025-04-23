const Product = require("../../models/Product");


const orderProduct = async (req, res) => {
  const { id } = req.params;
  let { productNumber } = req.body;

  const products = await Product.findByPk(id);
  
  if(!products) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  const order = await Product.update({
    productNumber,
  })
}