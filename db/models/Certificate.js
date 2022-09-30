import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const Certificate = db.define('certificate', {
    course_employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
    },
    code : {
        allowNull : false,
        type : Sequelize.STRING
    }
}, {
    freezeTableName : true
});

export default Certificate;