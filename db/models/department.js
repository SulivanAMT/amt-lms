import db from '../config/database.js';
import { Sequelize } from "sequelize";

const Organization = db.define('organization', {
    dept_code: {
        type: Sequelize.STRING
    },
    dept_description: {
        type: Sequelize.STRING
    },
})

export default Organization;