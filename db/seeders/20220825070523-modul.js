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
        modul_url : 'dashboard',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 2, 
        modul_name : 'Users',
        modul_url : '',
        modul_icon : '',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 3, 
        modul_name : 'Manage Courses',
        modul_url : '/home/courses',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 4, 
        modul_name : 'My Courses',
        modul_url : 'home/my_courses',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 5, 
        modul_name : 'Manage Exams',
        modul_url : 'home/exams',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 6, 
        modul_name : 'My Exams',
        modul_url : 'home/my_exams',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 7, 
        modul_name : 'Manage Quiz',
        modul_url : 'home/quiz',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 8, 
        modul_name : 'My Quiz',
        modul_url : 'home/my_quiz',
        modul_icon : '',
        is_parent : 'T',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 9, 
        modul_name : 'Reporting',
        modul_url : '',
        modul_icon : '',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 10, 
        modul_name : 'Settings',
        modul_url : '',
        modul_icon : '',
        is_parent : 'Y',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        id : 11, 
        modul_name : 'Logout',
        modul_url : 'logout',
        modul_icon : '',
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
