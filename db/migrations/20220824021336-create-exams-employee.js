'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('exams_employee', {
      id :{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      exam_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      point : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      score : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      start_at : {
        allowNull : false,
        type : Sequelize.DATE
      },
      end_at: {
        type : Sequelize.DATE
      },
      max_time : {
        type : Sequelize.DATE
      },
      status : {
        allowNull : false,
        type : Sequelize.ENUM('Done', 'In Progress')
      },
      passed_status : {
        allowNull : false,
        type : Sequelize.ENUM('Passed','Not Passed')
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
     await queryInterface.dropTable('exams_employee');
  }
};
