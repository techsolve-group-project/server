'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('QuestionPosts', [
      {
        UserId: 1,
        title: 'Apa itu REST API?',
        text: 'Saya masih bingung tentang konsep REST API. Bisa jelaskan?',
        aiAnswer: 'REST API adalah arsitektur komunikasi antar sistem menggunakan HTTP protocol.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        title: 'Cara kerja JWT?',
        text: 'Bagaimana cara kerja JWT untuk authentication?',
        aiAnswer: 'JWT bekerja dengan menyimpan data dalam token yang dienkripsi dan diverifikasi di setiap request.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('QuestionPosts', null, {});
  },
};
