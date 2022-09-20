import db from "../../config/database.js";
import Sequelize from "sequelize";
import QuizContestQuestions from "./QuizContestQuestions.js";
import Users from "./Users.js";
import QuizContestEmployee from "./QuizContestEmployee.js";

const QuizContestEmployeeAnswer = db.define('quiz_contest_employee_answer', {
    contest_employee_id : {
        type : Sequelize.INTEGER
    },
    contest_question_id : {
        type : Sequelize.INTEGER
    },
    answer_of_question : {
        type : Sequelize.STRING
    },
    is_correct : {
        type : Sequelize.ENUM('Y', 'T')
    },
    point : {
        type : Sequelize.FLOAT
    },
}, {
    freezeTableName : true
});

QuizContestEmployeeAnswer.belongsTo(QuizContestEmployee, {
    foreignKey : 'contest_employee_id'
});

QuizContestEmployeeAnswer.belongsTo(QuizContestQuestions, {
    foreignKey : 'contest_question_id'
});

export default QuizContestEmployeeAnswer;