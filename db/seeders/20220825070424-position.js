'use strict';

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
    await queryInterface.bulkInsert('position', [
      {
        position_code : 'PROGRAMMER-BD',
        position_name : 'Programmer',
        position_description : 'Teknisi Business Development',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        position_code : 'SUPERVISOR-BD',
        position_name : 'SPV Business Development',
        position_description : 'Lorem ipsum dolor sir amet',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        position_code : 'STAFF-AC',
        position_name : 'Staff Accounting',
        position_description : 'Lorem ipsum dolor sir amet',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        position_code : 'STAFF-HR',
        position_name : 'Staff Human Resources',
        position_description : 'Lorem ipsum dolor sir amet',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        position_code : 'EXTERNAL',
        position_name : 'External User',
        position_description : 'Lorem ipsum dolor sir amet',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('position', null, {});
  }
};
