'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('kpi_master', {
      id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      target_progress_course : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      target_average_exam : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
      period_year : {
        allowNull : false,
        type : Sequelize.STRING
      },
      organization_code : {
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
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('kpi_master')
  }
};
