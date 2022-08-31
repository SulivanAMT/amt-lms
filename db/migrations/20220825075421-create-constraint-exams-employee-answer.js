'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('exams_employee_answer', {
      fields : ['exam_question_id'],
      type : 'foreign key',
      name : 'FK_ExamsEmployeeAnswer_ExamsQuestions',
      references : {
        table : 'exams_questions',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('exams_employee_answer', {
      fields : ['exam_employee_id'],
      type : 'foreign key',
      name : 'FK_ExamsEmployeeAnswer_ExamsEmployee',
      references : {
        table : 'exams_employee',
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
