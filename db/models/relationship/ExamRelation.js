import db from "../../config/database.js";
import { Sequelize } from "sequelize";

const Exams = db.define('exams', {
    title : {
        type : Sequelize.STRING
      },
    course_id : {
        type : Sequelize.INTEGER
    },
    exam_time : {
        type : Sequelize.TIME
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
    created_by : {
        type : Sequelize.STRING
    },
});

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
}, {
    freezeTableName : true
});

const ExamsQuestions = db.define('exams_question', {
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
    answer_of_question : {
        type : Sequelize.STRING
    },
    question_type : {
        type : Sequelize.ENUM('Multiple Choice', 'Essay')
    }
})

export default Exams;