'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('courses_employee', {
      fields : ['course_id'],
      type : 'foreign key',
      name : 'FK_CoursesEmployee_Courses',
      references : {
        table : 'courses',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('courses_employee', {
      fields : ['employee_id'],
      type : 'foreign key',
      name : 'FK_CoursesEmployee_Employee',
      references : {
        table : 'users',
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
