import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Users from "./Users.js";
const { DataTypes } = Sequelize;

const Roles = db.define('roles', {
    roles : {
        type : Sequelize.INTEGER,
        primaryKey : true
    },
    roles_description: {
        type: Sequelize.STRING,
    },
}); 

export default Roles;