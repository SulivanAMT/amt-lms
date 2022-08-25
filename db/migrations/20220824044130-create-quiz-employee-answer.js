'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('quiz_employee_answer',{
      id : {
        allowNull : false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quiz_employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      quiz_question_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      answer_of_question : {
        allowNull : false,
        type : Sequelize.STRING
      },
      is_correct : {
        allowNull : false,
        type : Sequelize.ENUM('Y', 'T')
      },
      point : {
        allowNull : false,
        type : Sequelize.FLOAT
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
    await queryInterface.dropTable('quiz_employee_answer');
  }
};
