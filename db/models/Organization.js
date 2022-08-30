import db from "../../config/database.js";
import { Sequelize } from "sequelize";

const Organization = db.define('organization', {
    organization_code: {
        type: Sequelize.STRING,
        primaryKey : true
    },
    organization_name: {
        type: Sequelize.STRING
    },
    organization_code_head: {
        type: Sequelize.STRING
    },
    organization_type: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName : true
});

export default Organization;