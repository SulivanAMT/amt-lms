import db from '../../config/database.js';
import { Sequelize } from "sequelize";
import QuizMultipleChoice from './QuizMultipleChoice.js';
import Quiz from './Quiz.js';

const QuizQuestions = db.define('quiz_questions', {
    quiz_id : {
        type : Sequelize.INTEGER
    },
    name_of_question : {
        type : Sequelize.STRING
    },
    question_number : {
        type : Sequelize.INTEGER
    },
    answer_of_question : {
        type : Sequelize.STRING
    },
    question_type : {
        type : Sequelize.ENUM('Multiple Choice', 'Essay')
    }
}, {
    freezeTableName : true
});

QuizQuestions.hasMany(QuizMultipleChoice, {
    foreignKey : 'quiz_question_id'
});

export default QuizQuestions;