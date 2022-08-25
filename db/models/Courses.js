import db from '../config/database.js';
import { Sequelize } from "sequelize";

const Courses = db.define('courses', {
    course_name : {
        type : Sequelize.STRING
      },
    dept_code : {
        type : Sequelize.STRING
    },
    due_date : {
        type : Sequelize.DATE
    },
})

export default Courses;