'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        QuestionPostId: 1,
        UserId: 2,
        text: 'Penjelasan yang sangat membantu, terima kasih!',
        vote: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        QuestionPostId: 2,
        UserId: 1,
        text: 'JWT juga bisa digunakan untuk authorization ya?',
        vote: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
