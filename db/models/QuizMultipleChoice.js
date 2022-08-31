import db from '../../config/database.js';
import { Sequelize } from "sequelize";

const QuizMultipleChoice = db.define('quiz_multiple_choice', {
    quiz_question_id : {
        type: Sequelize.INTEGER
    },
    choice_name : {
        type : Sequelize.STRING
    },
    choice_type : {
        type : Sequelize.ENUM('A','B','C','D','E')
    }
}, {
    freezeTableName : true
});

export default QuizMultipleChoice;