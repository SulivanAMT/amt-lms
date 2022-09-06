import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import CoursesEmployee from "./CoursesEmployee.js";

const QuizEmployee = db.define('quiz_employee', {
    course_employee_id : {
        type : Sequelize.INTEGER
    },
    quiz_id : {
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
    }
}, {
    freezeTableName : true
});

QuizEmployee.belongsTo(CoursesEmployee, {
    foreignKey : 'course_employee_id'
})

export default QuizEmployee;