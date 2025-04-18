'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'user@mail.com',
        password: hashPassword('user'),
        name: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@mail.com',
        password: hashPassword('admin'),
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
