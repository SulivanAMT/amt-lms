import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import ExamsQuestions from "./ExamsQuestions.js";

const ExamsEmployeeAnswer = db.define('exams_employee_answer', {
    exam_employee_id : {
        type : Sequelize.INTEGER
    },
    exam_question_id : {
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
},{
    freezeTableName : true
});

ExamsEmployeeAnswer.belongsTo(ExamsQuestions, {
    foreignKey : 'exam_question_id'
});

export default ExamsEmployeeAnswer;