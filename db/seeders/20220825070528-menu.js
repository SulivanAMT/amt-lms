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
   await queryInterface.bulkInsert('menu', [
    {
      id : 1,
      menu_name : 'Users Data',
      menu_url : 'home/users',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 2,
      menu_name : 'Organization',
      menu_url : 'home/users/organization',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 3,
      menu_name : 'Position',
      menu_url : 'home/users/position',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 4,
      menu_name : 'Score',
      menu_url : 'home/reporting/score',
      menu_icon : '',
      modul_id : 9,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 5,
      menu_name : 'KPI Report',
      menu_url : 'home/reporting/performance',
      menu_icon : '',
      modul_id : 9,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 6,
      menu_name : 'Roles & Permission',
      menu_url : 'home/settings/roles_permission',
      menu_icon : '',
      modul_id : 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 7,
      menu_name : 'Modul & Menu',
      menu_url : 'home/settings/modul_menu',
      menu_icon : '',
      modul_id : 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 8,
      menu_name : 'KPI Setting',
      menu_url : 'home/settings/kpi',
      menu_icon : '',
      modul_id : 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('menu', null, {});
  }
};
