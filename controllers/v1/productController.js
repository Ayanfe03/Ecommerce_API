const { Op } = require('sequelize');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

// @desc POST Create a new product post (For the seller alone)
// @route POST /v1/products
// @access Private
const createProductsHandler = async (req, res) => {
  try {
    const { name, price, description, productNumber, categoryId } = req.body;

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name must be a string',
      });
    }

    if (typeof price !== 'number') {
      return res.status(400).json({
        message: 'Price must be a number',
      });
    }

    if (typeof description !== 'string') {
      return res.status(400).json({
        message: 'Description must be a string',
      });
    }

    if (typeof productNumber !== 'number') {
      return res.status(400).json({
        message: 'Product Number must be a string',
      });
    }
    
    if (typeof categoryId !== 'string') {
      return res.status(400).json({
        message: 'Category Id must be a string',
      });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const product = await Product.create({
      name, 
      price,
      description,
      productNumber,
      productSoldOut: false
    });

    product.setCategory(category);

    res.status(201).json(product);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


// @desc GET List all products with filters (category, price)
// @route GET /v1/products
// @access Public
const getAllProductsHandler = async (req, res) => {
  try {
    let { search, filter } = req.query; 

    if (search) {
      if (typeof search !== 'string') {
        return res.status(400).json({
          message: 'Search must be a string',
        });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      order: [['createdAt', 'DESC']],
    }); 
    return res.status(200).json(products);
    }

    if (filter) {
      // if (typeof filter !== 'string' || typeof filter !== 'number') {
      //   return res.status(400).json({
      //     message: 'Filter must be a string or a number',
      //   });
      // }

      const category = await Category.findOne({
        where: {
          name: filter,
        },
      });
      if (!category) {
        return res.status(400).json({
          message: 'Category not found',
        });
      }
      
      const products = await Product.findAll({
        where: {
          CategoryId: category.id,
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(products);
  }
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// @desc GET Get details about a single product
// @route GET /v1/products/:id
// @access Public
const getProductsHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({
        message: 'Id must be a string',
      });
    };

    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


// @desc PUT Update sold status of a single product
// @route PUT /v1/products/sold/:id
// @access Private
const markProductSoldOut = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}


// @desc DELETE Delete a single product
// @route DELETE /v1/products/:id
// @access Private
const deleteProductsHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({
        message: 'Id must be a string',
      });
    }

    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(500).json({
        message: 'Product not found',
      });
    }

    await products.destroy();

    res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}


module.exports = {
  createProductsHandler,
  getAllProductsHandler,
  getProductsHandler,
  deleteProductsHandler,
}