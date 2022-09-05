'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('lessons', {
      fields : ['course_id'],
      type : 'foreign key',
      name : 'FK_Lessons_Courses',
      references : {
        table : 'courses',
        field : 'id'
      },
      onDelete : 'cascade',
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
  }
};
