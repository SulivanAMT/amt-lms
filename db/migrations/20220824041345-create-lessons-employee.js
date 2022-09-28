'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('lessons_employee', {
      id : {
        allowNull : false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      lesson_detail_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      status : {
        allowNull : false,
        type : Sequelize.ENUM('Completed', 'Uncompleted')
      },
      point : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      progress : {
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
     await queryInterface.dropTable('lessons_employee');
  }
};
