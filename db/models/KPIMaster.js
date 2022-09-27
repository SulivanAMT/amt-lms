import db from "../../config/database.js";
import { Sequelize } from "sequelize";
import Organization from "./Organization.js";

const KPIMaster = db.define('kpi_master', {
    target_progress_course : {
        allowNull : false,
        type : Sequelize.FLOAT
      },
    target_average_exam : {
        allowNull : false,
        type : Sequelize.FLOAT
    },
    period_year : {
        allowNull : false,
        type : Sequelize.STRING
    },
    organization_code : {
        allowNull : false,
        type : Sequelize.INTEGER
    },
}, {
    freezeTableName : true
});

KPIMaster.belongsTo(Organization, {
    foreignKey : 'organization_code'
});

export default KPIMaster;