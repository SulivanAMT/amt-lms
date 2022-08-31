'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('quiz_questions', {
      id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quiz_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      name_of_question : {
        allowNull : false,
        type : Sequelize.STRING
      },
      question_number : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      answer_of_question : {
        allowNull : false,
        type : Sequelize.STRING
      },
      question_type : {
        allowNull : false,
        type : Sequelize.ENUM('Multiple Choice','Essay')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('quiz_questions');
  }
};
