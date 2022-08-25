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
     await queryInterface.bulkInsert('organization', [
      {
        organization_code: 'BD',
        organization_name: 'Business Development',
        organization_code_head: 'DU',
        organization_type: 'Department',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'DU',
        organization_name: 'Direktur Utama',
        organization_code_head: '',
        organization_type: 'Board Of Director',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'AC',
        organization_name: 'Accounting',
        organization_code_head: 'FI',
        organization_type: 'Department',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'FI',
        organization_name: 'Finance',
        organization_code_head: 'DU',
        organization_type: 'Division',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'HR',
        organization_name: 'Human Resources',
        organization_code_head: 'GA',
        organization_type: 'Department',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'GA',
        organization_name: 'General Affair',
        organization_code_head: 'DU',
        organization_type: 'Division',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        organization_code: 'EU',
        organization_name: 'External Unit',
        organization_code_head: 'DU',
        organization_type: 'Division',
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('organization', null, {});
  }
};
