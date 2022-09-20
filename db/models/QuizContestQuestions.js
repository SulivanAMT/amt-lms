import db from "../../config/database.js";
import Sequelize from "sequelize";
import QuizContest from "./QuizContest.js";
import QuizContestMultipeChoice from "./QuizContestMultipleChoice.js";

const QuizContestQuestions = db.define('quiz_contest_questions', {
    quiz_contest_id : {
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
        type : Sequelize.ENUM('Multiple Choice','Essay')
    },
}, {
    freezeTableName : true
});

QuizContestQuestions.belongsTo(QuizContest, {
    foreignKey : 'quiz_contest_id'
});

QuizContestQuestions.hasMany(QuizContestMultipeChoice, {
    foreignKey : 'contest_question_id'
});

export default QuizContestQuestions;