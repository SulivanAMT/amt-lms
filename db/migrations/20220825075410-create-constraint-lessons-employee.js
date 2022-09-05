'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('lessons_employee', {
      fields : ['lesson_detail_id'],
      type : 'foreign key',
      name : 'FK_LessonsEmployee_LessonsDetail',
      references : {
        table : 'lessons_detail',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('lessons_employee', {
      fields : ['course_employee_id'],
      type : 'foreign key',
      name : 'FK_LessonsEmployee_CoursesEmployee',
      references : {
        table : 'courses_employee',
        field : 'id'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
