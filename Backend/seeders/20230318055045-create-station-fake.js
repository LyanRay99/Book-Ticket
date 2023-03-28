"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * */
    //* Setup to Seeder backup data Station table
    await queryInterface.bulkInsert(
      "Stations",
      [
        {
          name: "Ben xe mien tay",
          address: "1000 truong chinh",
          province: "Bến Tre",
          createdAt: "2023-03-17 14:55:04",
          updatedAt: "2023-03-17 15:13:39",
        },
        {
          name: "Ben xe",
          address: "1000 truong chinh",
          province: "Đà Nẵng",
          createdAt: "2023-03-17 14:55:09",
          updatedAt: "2023-03-17 14:55:09",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Stations", null, {});
  },
};
