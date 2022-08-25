import db from '../config/database.js';
import { Sequelize } from "sequelize";

const Position = db.define('position', {
    position_name : {
        allowNull : false,
        type : Sequelize.STRING
      },
    position_description : {
        allowNull : false,
        type : Sequelize.STRING
    },
})

export default Exams;