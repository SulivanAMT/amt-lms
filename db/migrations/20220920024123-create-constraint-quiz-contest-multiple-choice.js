'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('quiz_contest_multiple_choice', {
      fields : ['contest_question_id'],
      type : 'foreign key',
      name : 'FK_QuizContestMultiple_QuizContestQuestion',
      references : {
        table : 'quiz_contest_questions',
        field : 'id'
      },
      onDelete : 'cascade',
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
     await queryInterface.removeConstraint('quiz_contest_multiple_choice','FK_QuizContestMultiple_QuizContestQuestion');
  }
};
