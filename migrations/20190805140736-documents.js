'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('documents', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

      },
      documentId: Sequelize.STRING,
      type: Sequelize.ENUM('License', 'Permit'),
      driverId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Drivers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      truckId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Trucks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      issueDate: Sequelize.DATE,
      expiryDate: Sequelize.DATE,
      imageUrl: Sequelize.STRING

    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('documents');
  }
};