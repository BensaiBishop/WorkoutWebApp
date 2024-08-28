'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users','username',{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 20],
          msg: 'Username must be between 3 and 20 characters long.'
        }
      }
    })
    await queryInterface.changeColumn('Users','password',{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isComplex(value) {
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          if (!passwordRegex.test(value)) {
            throw new Error (
              'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number'
            );
          };
        }
      }
    })
    await queryInterface.changeColumn('Users','email',{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true,
    });
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true,
    });
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true
      }
    });
  }
};
