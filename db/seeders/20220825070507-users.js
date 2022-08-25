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
     await queryInterface.bulkInsert('users', [
      {
        name : 'Irvan Sulistio',
        email : 'irvan.sulistio@amt-it.com',
        phone_number : '12345',
        password : '$2a$12$T76jQtzqkmiCte7pA9PaF.0LjmK2YX3xCrADGXxPRRhXybILubkqS',
        organization_code : 'BD',
        roles : 'CMO',
        status : 'Actived',
        position_code : 'PROGRAMMER-BD',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name : 'John Doe 1',
        email : 'johndoe1@amt-it.com',
        phone_number : '12345',
        password : '$2a$12$T76jQtzqkmiCte7pA9PaF.0LjmK2YX3xCrADGXxPRRhXybILubkqS',
        organization_code : 'HR',
        roles : 'HRD',
        status : 'Actived',
        position_code : 'STAFF-HR',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name : 'Anton Nurhadiyanto',
        email : 'johndoe1@amt-it.com',
        phone_number : '12345',
        password : '$2a$12$T76jQtzqkmiCte7pA9PaF.0LjmK2YX3xCrADGXxPRRhXybILubkqS',
        organization_code : 'BD',
        roles : 'SPV',
        status : 'Actived',
        position_code : 'SUPERVISOR-BD',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name : 'John Doe 2',
        email : 'johndoe2@amt-it.com',
        phone_number : '12345',
        password : '$2a$12$T76jQtzqkmiCte7pA9PaF.0LjmK2YX3xCrADGXxPRRhXybILubkqS',
        organization_code : 'HR',
        roles : 'CBT',
        status : 'Actived',
        position_code : 'STAFF-HR',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name : 'John Doe 3',
        email : 'johndoe2@amt-it.com',
        phone_number : '12345',
        password : '$2a$12$T76jQtzqkmiCte7pA9PaF.0LjmK2YX3xCrADGXxPRRhXybILubkqS',
        organization_code : 'HR',
        roles : 'ADM',
        status : 'Actived',
        position_code : 'STAFF-HR',
        createdAt : new Date(),
        updatedAt : new Date(),
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
    await queryInterface.bulkDelete('users', null, {})
  }
};
