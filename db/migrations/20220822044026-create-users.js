'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull : false,
        type: Sequelize.STRING
      },
      email: {
        allowNull : false,
        type: Sequelize.STRING,
        length : 100
      },
      phone_number: {
        allowNull : false,
        type: Sequelize.STRING,
        length : 20
      },
      password: {
        allowNull : false,
        type: Sequelize.STRING,
        length : 255
      },
      dept_code: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      token : {
        type : Sequelize.STRING,
        length : 500
      },
      status : {
        type : Sequelize.ENUM('Actived', 'Deactived')
      },
      position_id : {
        allowNull : false,
        type : Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};