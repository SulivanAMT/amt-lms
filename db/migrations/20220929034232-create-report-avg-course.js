'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('report_avg_course', {
        id : {
          allowNull: false,
          type : Sequelize.INTEGER
        },
        name : {
          allowNull : false,
          type : Sequelize.STRING
        },
        organization_code : {
          allowNull : false,
          type : Sequelize.STRING
        },
        organization_name : {
          allowNull : false,
          type : Sequelize.STRING
        },
        average_course : {
          allowNull : false,
          type : Sequelize.FLOAT
        },
        periode : {
          allowNull : false,
          type : Sequelize.STRING
        },
        tahun : {
          allowNull : false,
          type : Sequelize.STRING
        },
        tgl_generate : {
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
    await queryInterface.dropTable('report_avg_course')
  }
};
