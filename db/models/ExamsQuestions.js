import db from '../config/database.js';
import { Sequelize } from "sequelize";

const ExamsQuestions = db.define('lessons', {
    lesson_title : {
        type : Sequelize.STRING
    },
})

export default ExamsQuestions;