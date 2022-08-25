'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('quiz_questions', {
      fields : ['quiz_id'],
      type : 'foreign key',
      name : 'FK_QuizQuestions_Quiz',
      references : {
        table : 'quiz',
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
