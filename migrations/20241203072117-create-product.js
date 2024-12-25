'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add altering commands here.
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productNumber: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      productSoldOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },    
      CategoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id'
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    // Add reverting commands here.
    await queryInterface.dropTable('Products');
  }
};
