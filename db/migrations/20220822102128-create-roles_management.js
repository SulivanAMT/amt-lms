'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('roles_management', {
      id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roles : {
        allowNull : false,
        type : Sequelize.STRING
      },
      flag_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      permission : {
        allowNull : false,
        type : Sequelize.STRING
      },
      type : {
        allowNull : false,
        type : Sequelize.ENUM('Menu', 'Modul')
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
     await queryInterface.dropTable('roles_management');
  }
};
