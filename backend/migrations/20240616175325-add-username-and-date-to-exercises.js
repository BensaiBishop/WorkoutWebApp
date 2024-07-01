'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Exercises', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Exercises', 'currentDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Exercises', 'username');
    await queryInterface.removeColumn('Exercises', 'currentDate');
  }
};
