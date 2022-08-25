'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('users', {
      fields : ['roles'],
      type : 'foreign key',
      name : 'FK_Users_Roles',
      references : {
        table : 'roles',
        field : 'roles_code'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('users', {
      fields : ['organization_code'],
      type : 'foreign key',
      name : 'FK_Users_Organization',
      references : {
        table : 'organization',
        field : 'organization_code'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });

    await queryInterface.addConstraint('users', {
      fields : ['position_code'],
      type : 'foreign key',
      name : 'FK_Users_Position',
      references : {
        table : 'position',
        field : 'position_code'
      },
      onDelete : 'no action',
      onUpdate : 'no action'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('users', 'FK_Users_Roles');
    await queryInterface.removeConstraint('users', 'FK_Users_Organization');
    await queryInterface.removeConstraint('users', 'FK_Users_Position');
  }
};
