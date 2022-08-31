'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('exams_employee', {
      fields : ['exam_id'],
      type : 'foreign key',
      name : 'FK_ExamsEmployee_Exams',
      references : {
        table : 'exams',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('exams_employee', {
      fields : ['employee_id'],
      type : 'foreign key',
      name : 'FK_ExamsEmployee_Users',
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
