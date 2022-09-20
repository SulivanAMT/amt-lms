import db from '../../config/database.js';
import { Sequelize } from "sequelize";
import Users from './Users.js';
import Organization from './Organization.js';

const Courses = db.define('courses', {
    course_name : {
        type : Sequelize.STRING
    },
    description : {
        allowNull : false
    },
    organization_code : {
        type : Sequelize.STRING
    },
    due_date : {
        type : Sequelize.DATE
    },
    created_by : {
        type : Sequelize.STRING
    },
});

Courses.belongsTo(Users, {
    foreignKey : 'created_by'
});

Courses.belongsTo(Organization, {
    foreignKey : 'organization_code'
});

export default Courses;