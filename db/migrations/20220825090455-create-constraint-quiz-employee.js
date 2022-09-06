'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('quiz_employee', {
      fields : ['quiz_id'],
      type : 'foreign key',
      name : 'FK_QuizEmployee_Quiz',
      references : {
        table : 'quiz',
        field : 'id'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('quiz_employee', {
      fields : ['course_employee_id'],
      type : 'foreign key',
      name : 'FK_QuizEmployee_CoursesEmployee',
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
