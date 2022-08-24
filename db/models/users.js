import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Roles from "./roles.js";
const { DataTypes } = Sequelize;
 
const Users = db.define('users', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  dept_code: {
    type: DataTypes.STRING,
  },
  token : {
    type : DataTypes.STRING,
  }
},{
  freezeTableName: true
});

Users.hasOne(Roles);
 
export default Users;