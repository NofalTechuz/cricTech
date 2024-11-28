'use strict';
const { encryptPassword } = require('../../tokens/password');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bg_user_auth', [{
      email: 'nofal@techuz.com',
      number: '9909900999 ',
      username: 'admin',
      password: encryptPassword('Admin@123'), // Make sure to use a hashed password
      user_role: 1, // Assuming 1 is the default user role
      status: 1, // Assuming 1 is the active status
      token: null,
      forget_password_token: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bg_user_auth', {
      email: 'testuser@example.com' // Use email to identify the record for deletion
    }, {});
  }
};
