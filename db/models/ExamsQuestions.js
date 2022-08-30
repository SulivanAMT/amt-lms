const db = require('../../config/database.js');
const { Sequelize } = require("sequelize");

const ExamsQuestions = db.define('lessons', {
    lesson_title : {
        type : Sequelize.STRING
    },
})

module.exports = ExamsQuestions;