import { Sequelize } from "sequelize";
import db from "../../config/database.js";
const { DataTypes } = Sequelize;
import Roles from "./Roles.js";
import Organization from "./Organization.js";
import Position from "./Position.js";
 
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
  organization_code: {
    type: DataTypes.STRING,
  },
  roles : {
    type : DataTypes.STRING
  },
  refresh_token : {
    type : DataTypes.STRING,
  },
  status : {
    type : DataTypes.ENUM('Actived', 'Deactived')
  },
  position_code : {
    type : DataTypes.STRING
  }
},{
  freezeTableName: true
});
 
Users.belongsTo(Roles, {
  foreignKey : 'roles'
});

Roles.hasMany(Users, {
  foreignKey : 'roles'
});

Users.belongsTo(Roles, {
  foreignKey : 'roles'
});

Users.belongsTo(Organization, {
  foreignKey : 'organization_code'
});

Users.belongsTo(Position, {
  foreignKey : 'position_code'
})

export default Users;