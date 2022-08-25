'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('quiz_employee_answer', {
      fields : ['quiz_question_id'],
      type : 'foreign key',
      name : 'FK_QuizEmployeeAnswer_QuizQuestions',
      references : {
        table : 'quiz_questions',
        field : 'id'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('quiz_employee_answer', {
      fields : ['quiz_employee_id'],
      type : 'foreign key',
      name : 'FK_QuizEmployeeAnswer_QuizEmployee',
      references : {
        table : 'exams_questions',
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
