import db from '../../../config/database.js';
import { Sequelize } from "sequelize";
import Courses from '../Courses.js';

const LessonsDetail = db.define('lessons_detail', {
    lesson_id : {
        type: Sequelize.INTEGER
    },
    lesson_detail_title : {
        type : Sequelize.STRING
    },
    lesson_content : {
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

const LessonsEmployee = db.define('lessons_employee', {
    course_employee_id : {
        type : Sequelize.INTEGER
    },
    lesson_detail_id : {
        type : Sequelize.INTEGER
    },
    status : {
        type : Sequelize.ENUM('Completed','Uncompleted')
    },
    point : {
        type : Sequelize.FLOAT
    }
}, {
    freezeTableName : true
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

LessonsDetail.hasOne(LessonsEmployee, {
    foreignKey : 'lesson_detail_id'
});

LessonsEmployee.belongsTo(LessonsDetail, {
    foreignKey : 'lesson_detail_id'
});

export { Lessons, LessonsDetail, LessonsEmployee };