import { Sequelize } from "sequelize";
import db from "../../config/database.js";
const { DataTypes } = Sequelize;

const Roles = db.define('roles', {
    roles_code: {
        type: Sequelize.STRING
    },
    roles_description: {
        type: Sequelize.STRING,
    },
}); 

export default Roles;