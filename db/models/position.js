import db from '../../config/database.js';
import { Sequelize } from "sequelize";

const Position = db.define('position', {
    position_code : {
        type : Sequelize.STRING,
        primaryKey : true
    },
    position_name : {
        type : Sequelize.STRING
    },
    position_description : {
        type : Sequelize.STRING
    },
},  {
    freezeTableName : true
})

export default Position;