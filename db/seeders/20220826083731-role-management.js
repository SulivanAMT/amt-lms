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
   await queryInterface.bulkInsert('roles_management', [
    {
      id : 1,
      roles : 'ADM',
      flag_id : 1,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 2,
      roles : 'ADM',
      flag_id : 2,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 3,
      roles : 'ADM',
      flag_id : 3,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 4,
      roles : 'ADM',
      flag_id : 4,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 5,
      roles : 'ADM',
      flag_id : 5,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 6,
      roles : 'ADM',
      flag_id : 6,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 7,
      roles : 'ADM',
      flag_id : 7,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 8,
      roles : 'ADM',
      flag_id : 8,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 9,
      roles : 'ADM',
      flag_id : 1,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 10,
      roles : 'ADM',
      flag_id : 2,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 11,
      roles : 'ADM',
      flag_id : 3,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 12,
      roles : 'ADM',
      flag_id : 4,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 13,
      roles : 'ADM',
      flag_id : 5,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 14,
      roles : 'ADM',
      flag_id : 6,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 15,
      roles : 'ADM',
      flag_id : 7,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 16,
      roles : 'ADM',
      flag_id : 8,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 17,
      roles : 'ADM',
      flag_id : 9,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 18,
      roles : 'ADM',
      flag_id : 10,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 19,
      roles : 'ADM',
      flag_id : 11,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 20,
      roles : 'ADM',
      flag_id : 12,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 21,
      roles : 'ADM',
      flag_id : 13,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 22,
      roles : 'ADM',
      flag_id : 14,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 23,
      roles : 'ADM',
      flag_id : 15,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 24,
      roles : 'ADM',
      flag_id : 16,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 25,
      roles : 'ADM',
      flag_id : 17,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 26,
      roles : 'CMO',
      flag_id : 1,
      permission : 'Read',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 27,
      roles : 'CMO',
      flag_id : 3,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 28,
      roles : 'CMO',
      flag_id : 4,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 29,
      roles : 'CMO',
      flag_id : 5,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 30,
      roles : 'CMO',
      flag_id : 6,
      permission : 'Read',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 31,
      roles : 'CMO',
      flag_id : 9,
      permission : 'Read',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 32,
      roles : 'CMO',
      flag_id : 11,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 33,
      roles : 'CMO',
      flag_id : 13,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 34,
      roles : 'CMO',
      flag_id : 14,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 35,
      roles : 'CMO',
      flag_id : 16,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 36,
      roles : 'CMO',
      flag_id : 17,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 37,
      roles : 'ADM',
      flag_id : 9,
      permission : 'Create, Read, Update, Delete',
      type : 'Modul',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 38,
      roles : 'ADM',
      flag_id : 18,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 39,
      roles : 'ADM',
      flag_id : 19,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 40,
      roles : 'ADM',
      flag_id : 20,
      permission : 'Create, Read, Update, Delete',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 41,
      roles : 'CMO',
      flag_id : 19,
      permission : 'Read',
      type : 'Menu',
      createdAt : new Date(),
      updatedAt : new Date()
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles_management', null, {});
  }
};
