'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('certificate', {
        id : {
          allowNull : false,
          type : Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        course_employee_id : {
          allowNull : false,
          type : Sequelize.INTEGER
        },
        code : {
          allowNull : false,
          type : Sequelize.STRING
        },
        createdAt : {
          allowNull : false,
          type : Sequelize.DATE
        },
        updatedAt : {
          allowNull : false,
          type : Sequelize.DATE
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
      await queryInterface.dropTable('certificate');
  }
};
