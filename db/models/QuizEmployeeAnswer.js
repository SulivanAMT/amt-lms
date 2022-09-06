import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const QuizEmployeeAnswer = db.define('quiz_employee_answer', {
    quiz_employee_id : {
        type : Sequelize.INTEGER
    },
    quiz_question_id : {
        type : Sequelize.INTEGER
    },
    answer_of_question : {
        type : Sequelize.STRING
    },
    is_correct : {
        type : Sequelize.ENUM('Y','T')
    },
    point : {
        type : Sequelize.FLOAT
    }
}, {
    freezeTableName : true
});

export default QuizEmployeeAnswer;