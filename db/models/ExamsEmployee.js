import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const ExamsEmployee = db.define('exams_employee', {
    course_employee_id : {
        type: Sequelize.INTEGER
    },
    exam_id : {
        type : Sequelize.INTEGER
    },
    point_total : {
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

export default ExamsEmployee;