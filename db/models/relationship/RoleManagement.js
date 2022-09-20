import { Sequelize } from "sequelize";
import db from "../../../config/database.js";
import Roles from "../Roles.js";

const Modul = db.define('modul', {
    modul_name : {
        type : Sequelize.STRING
    },
    modul_url : {
        type : Sequelize.STRING
    },
    modul_icon : {
        type : Sequelize.STRING
    },
    is_parent : {
        type : Sequelize.ENUM('Y','T')
    }
}, {
    freezeTableName : true
});

const Menu = db.define('menu', {
    menu_name : {
        type : Sequelize.STRING
    },
    menu_url : {
        type : Sequelize.STRING
    },
    menu_icon : {
        type : Sequelize.STRING
    },
    modul_id : {
        type : Sequelize.INTEGER
    }
}, {
    freezeTableName : true
});

const RolesManagement = db.define('roles_management', {
    roles : {
        type : Sequelize.STRING
    },
    flag_id : {
        type : Sequelize.INTEGER
    },
    permission : {
        type : Sequelize.STRING
    },
    type : {
        type : Sequelize.ENUM('Modul', 'Menu')
    }
}, {
    freezeTableName : true
});

RolesManagement.belongsTo(Roles, {
    foreignKey : 'roles'
});

Modul.hasMany(Menu, {
    foreignKey : 'modul_id'
});

Menu.belongsTo(Modul, {
    foreignKey : 'modul_id'
});

Menu.hasOne(RolesManagement, {
    foreignKey : 'flag_id'
});

RolesManagement.belongsTo(Modul, {
    foreignKey : 'flag_id'
});

RolesManagement.belongsTo(Menu, {
    foreignKey : 'flag_id'
});

export { Modul, Menu, RolesManagement };