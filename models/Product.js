const { DataTypes } = require('sequelize');
const sequelize= require('../db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productNumber: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  productSoldOut: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },    
}, {
  timestamps: true,
}); 

Product.belongsTo(Category);

module.exports = Product;