import db from '../config/database.js';
import { Sequelize } from "sequelize";

const Quiz = db.define('quiz', {
    title : {
        type : Sequelize.STRING
    },
    course_id : {
        type : Sequelize.INTEGER
    },
    quiz_time : {
        type : Sequelize.TIME
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
})

export default Quiz;