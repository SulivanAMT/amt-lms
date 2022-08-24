'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('modul', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        modul_name: {
          allowNull : false,
          type: Sequelize.STRING
        },
        modul_url: {
          type: Sequelize.STRING
        },
        modul_icon: {
          allowNull : false,
          type: Sequelize.STRING
        },
        is_parent: {
          allowNull : false,
          type: Sequelize.ENUM('Y','T')
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
    await queryInterface.dropTable('modul');
  }
};
