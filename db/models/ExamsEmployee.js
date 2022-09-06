import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import CoursesEmployee from "./CoursesEmployee.js";

const ExamsEmployee = db.define('exams_employee', {
    course_employee_id : {
        type: Sequelize.INTEGER
    },
    exam_id : {
        type : Sequelize.INTEGER
    },
    point : {
        type : Sequelize.FLOAT
    },
    score : {
        type : Sequelize.FLOAT
    },
    start_at : {
        type : Sequelize.DATE
    },
    end_at : {
        type : Sequelize.DATE
    },
    max_time : {
        type : Sequelize.DATE
    },
    status : {
        type : Sequelize.ENUM('Done', 'In Progress')
    },
    passed_status : {
        type : Sequelize.ENUM('Passed', 'Not Passed')
    }
}, {
    freezeTableName : true
});

ExamsEmployee.belongsTo(CoursesEmployee, {
    foreignKey : 'course_employee_id'
});

export default ExamsEmployee;