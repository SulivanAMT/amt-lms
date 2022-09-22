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
    await queryInterface.bulkInsert('modul', [
      {
        id : 1, 
        modul_name : 'Dashboard',
        modul_url : '/home/dashboard',
        modul_icon : 'fas fa-home',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 2, 
        modul_name : 'Users',
        modul_url : '',
        modul_icon : 'fas fa-users',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 3, 
        modul_name : 'Courses',
        modul_url : '',
        modul_icon : 'fas fa-table',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 4, 
        modul_name : 'Exams',
        modul_url : '',
        modul_icon : 'fas fa-newspaper',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 5, 
        modul_name : 'Quiz',
        modul_url : '',
        modul_icon : 'fas fa-book-open',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 6, 
        modul_name : 'Contest',
        modul_url : '',
        modul_icon : 'fas fa-trophy',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 7, 
        modul_name : 'Reporting',
        modul_url : '',
        modul_icon : 'fas fa-list',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 8, 
        modul_name : 'Settings',
        modul_url : '',
        modul_icon : 'fas fa-wrench',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 9, 
        modul_name : 'Logout',
        modul_url : '/home/logout',
        modul_icon : 'fas fa-sign-out-alt',
        is_parent : 'T',
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
    await queryInterface.bulkDelete('modul', null, {});
  }
};
