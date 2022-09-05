'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('courses_employee', {
      id : {
        allowNull : false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      course_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      progress : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      status : {
        allowNull : false,
        type : Sequelize.ENUM('Completed','In Progress')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('courses_employee');
  }
};
