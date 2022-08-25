'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('roles_management', {
      fields : ['roles'],
      type : 'foreign key',
      name : 'FK_RolesManagement_Roles',
      references : {
        table : 'roles',
        field : 'roles_code'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('roles_management', 'FK_RolesManagement_Roles');
  }
};
