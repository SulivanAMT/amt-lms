import db from "../../config/database.js";
import { Sequelize } from "sequelize";
import Courses from "./Courses.js";

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
    passing_grade : {
        type : Sequelize.FLOAT
    }
});

Exams.belongsTo(Courses, {
    foreignKey : 'course_id'
});

export default Exams;