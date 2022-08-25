'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('organization', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_code: {
        allowNull : false,
        type: Sequelize.STRING
      },
      organization_name: {
        allowNull : false,
        type: Sequelize.STRING
      },
      organization_code_head: {
        allowNull : false,
        type: Sequelize.STRING
      },
      organization_type: {
        allowNull : false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
        queryInterface.addIndex('organization', ['organization_code']);
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('organization');
  }
};
