const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productQuantity: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'productId'],
    }
  ]
}, {
  timestamps: true,
});

CartItem.associate = (models) => {
  CartItem.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
  CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product'});
}

module.exports = CartItem;