import db from '../../../config/database.js';
import { Sequelize } from "sequelize";
import Courses from '../Courses.js';

const LessonsDetail = db.define('lessons_detail', {
    lesson_id : {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    lesson_content : {
        allowNull : false,
        type : Sequelize.TEXT
    },
}, {
    freezeTableName : true
});

const Lessons = db.define('lessons', {
    course_id : {
        type: Sequelize.INTEGER
    },
    lesson_title : {
        type : Sequelize.STRING
    },
    created_by : {
        type : Sequelize.STRING
    },
});

Lessons.hasMany(LessonsDetail, {
    foreignKey : 'lesson_id'
});

Lessons.belongsTo(Courses, {
    foreignKey : 'course_id'
});

LessonsDetail.belongsTo(Lessons, {
    foreignKey : 'lesson_id'
});

export { Lessons, LessonsDetail };