import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Users from "./users.js";
const { DataTypes } = Sequelize;

const Roles = db.define('roles', {
    id: {
        type: Sequelize.INTEGER
    },
    roles_code: {
        type: Sequelize.STRING
    },
    roles_description: {
        type: Sequelize.STRING,
    },
});

Roles.belongsTo(Users);

export default Roles;