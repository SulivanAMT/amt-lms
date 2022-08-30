const db = require('../../config/database.js');
const { Sequelize } = require("sequelize");

const Exams = db.define('exams', {
    title : {
        type : Sequelize.STRING
      },
    course_id : {
        type : Sequelize.INTEGER
    },
    exam_time : {
        type : Sequelize.TIME
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
    created_by : {
        type : Sequelize.STRING
    },
})

module.exports = Exams;