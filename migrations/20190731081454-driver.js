'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

     return queryInterface.createTable('drivers', { id: {
       type:Sequelize.INTEGER,
       unique:true,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true,
  

      },
    name:Sequelize.STRING,
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('drivers');
  }
};
