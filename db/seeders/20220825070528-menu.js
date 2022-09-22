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
      menu_url : '/home/users',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 2,
      menu_name : 'Organization',
      menu_url : '/home/organization',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 3,
      menu_name : 'Position',
      menu_url : '/home/position',
      menu_icon : '',
      modul_id : 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 4,
      menu_name : 'Score',
      menu_url : '/home/reporting/score',
      menu_icon : '',
      modul_id : 7,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 5,
      menu_name : 'KPI Report',
      menu_url : '/home/reporting/performance',
      menu_icon : '',
      modul_id : 7,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 6,
      menu_name : 'Roles & Permission',
      menu_url : '/home/settings/roles_permission',
      menu_icon : '',
      modul_id : 8,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 7,
      menu_name : 'Modul & Menu',
      menu_url : '/home/settings/modul_menu',
      menu_icon : '',
      modul_id : 8,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 8,
      menu_name : 'KPI Setting',
      menu_url : '/home/settings/kpi',
      menu_icon : '',
      modul_id : 8,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 9,
      menu_name : 'Manage Courses',
      menu_url : '/home/courses',
      menu_icon : '',
      modul_id : 3,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 10,
      menu_name : 'Manage Lessons',
      menu_url : '/home/lessons',
      menu_icon : '',
      modul_id : 3,
      createdAt : new Date(),
      updatedAt : new Date()
    },  
    {
      id : 11,
      menu_name : 'My Courses',
      menu_url : '/home/my_courses',
      menu_icon : '',
      modul_id : 3,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 12,
      menu_name : 'Manage Exams',
      menu_url : '/home/exams',
      menu_icon : '',
      modul_id : 4,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 13,
      menu_name : 'My Exams',
      menu_url : '/home/my_exams',
      menu_icon : '',
      modul_id : 4,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 14,
      menu_name : 'Result',
      menu_url : '/home/result_exams',
      menu_icon : '',
      modul_id : 4,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 15,
      menu_name : 'Manage Quiz',
      menu_url : '/home/quiz',
      menu_icon : '',
      modul_id : 5,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 16,
      menu_name : 'My Quiz',
      menu_url : '/home/my_quiz',
      menu_icon : '',
      modul_id : 5,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 17,
      menu_name : 'Result',
      menu_url : '/home/result_quiz',
      menu_icon : '',
      modul_id : 5,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 18,
      menu_name : 'Manage Quiz Contest',
      menu_url : '/home/quiz_contest',
      menu_icon : '',
      modul_id : 6,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 19,
      menu_name : 'Result Quiz Contest',
      menu_url : '/home/result_quiz_contest',
      menu_icon : '',
      modul_id : 6,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      id : 20,
      menu_name : 'Winner Quiz Contest',
      menu_url : '/home/winner_quiz_contest',
      menu_icon : '',
      modul_id : 6,
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
