import db from '../config/database.js';
import { Sequelize } from "sequelize";

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

export default ExamsMultipleChoice;