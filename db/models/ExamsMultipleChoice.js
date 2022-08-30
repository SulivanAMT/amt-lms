const db = require('../../config/database.js');
const { Sequelize } = require("sequelize");

const ExamsMultipleChoice = db.define('exams_multiple_choice', {
    exam_question_id : {
        type: Sequelize.INTEGER
    },
    choice_name : {
        type : Sequelize.STRING
    },
    choice_type : {
        type : Sequelize.ENUM('A','B','C','D','E')
    },
})

module.exports = ExamsMultipleChoice;