import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Courses from "./Courses.js";
import Users from "./Users.js";

const CoursesEmployee = db.define('courses_employee', {
    employee_id : {
        type : Sequelize.INTEGER
    },
    course_id : {
        type : Sequelize.INTEGER
    },
    progress : {
        type : Sequelize.FLOAT
    },
    status : {
        type : Sequelize.ENUM('Completed', 'In Progress')
    }
}, {
    freezeTableName : true,
    hooks :{
        beforeUpdate : (courses, options) => {
            if(courses.progress >= 100){
                courses.progress = 100;
                courses.status = 'Completed'
            }else{
                courses.status = 'In Progress'
            }
        }
    }
});

CoursesEmployee.belongsTo(Users, {
    foreignKey : 'employee_id'
});

CoursesEmployee.belongsTo(Courses, {
    foreignKey : 'course_id'
});

export default CoursesEmployee;