'use strict';

const exercise = require('../models/exercise');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Exercises',[{
      userId: 1,
      postDate: new Date(),
      username: 'demo-user',
      exerciseName: 'Pushups',
      weight: '100',
      reps: '50',
      sets: '5',
      createdAt:new Date(),
      updatedAt:new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Exercises',null,{});
  }
};
