import db from '../config/database.js';
import { Sequelize } from "sequelize";

const Lessons = db.define('lessons', {
    course_id : {
        type: Sequelize.INTEGER
    },
    lesson_title : {
        type : Sequelize.STRING
    },
})

export default Lessons;