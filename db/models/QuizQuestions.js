import db from '../config/database.js';
import { Sequelize } from "sequelize";

const LessonsDetail = db.define('lessons', {
    lesson_id : {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    lesson_content : {
        allowNull : false,
        type : Sequelize.TEXT
    },
})

export default LessonsDetail;