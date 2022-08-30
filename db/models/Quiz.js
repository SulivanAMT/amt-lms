const db = require('../../config/database.js');
const { Sequelize } = require("sequelize");

const Quiz = db.define('quiz', {
    title : {
        type : Sequelize.STRING
    },
    course_id : {
        type : Sequelize.INTEGER
    },
    quiz_time : {
        type : Sequelize.TIME
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
    created_by : {
        type : Sequelize.STRING
    },
})

module.exports = Quiz;