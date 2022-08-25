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
    await queryInterface.bulkInsert('roles', [
      {
        roles_code : 'ADM',
        roles_description : 'Administrator',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        roles_code : 'CBT',
        roles_description : 'Contributor',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        roles_code : 'SPV',
        roles_description : 'Supervisor',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        roles_code : 'CMO',
        roles_description : 'User',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        roles_code : 'HRD',
        roles_description : 'Human Resources SPV',
        createdAt : new Date(),
        updatedAt : new Date()
      }     
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null , {});
  }
};
