import db from "../../config/database.js";
import { Sequelize } from "sequelize";
import ExamsMultipleChoice from "./ExamsMultipleChoice.js";
import Exams from "./Exams.js";

const ExamsQuestions = db.define('exams_questions', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    exam_id : {
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


ExamsQuestions.hasMany(ExamsMultipleChoice, {
    foreignKey : 'exam_question_id'
});

ExamsQuestions.belongsTo(Exams, {
    foreignKey : 'exam_id'
});

export default ExamsQuestions;