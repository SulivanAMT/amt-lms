import db from '../config/database.js';
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
})

export default Exams;