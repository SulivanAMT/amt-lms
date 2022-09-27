import { Op } from "sequelize";
import KPIMaster from "../db/models/KPIMaster.js"
import Organization from "../db/models/Organization.js";

export const repoCreateKPI = async(data) => {
    await KPIMaster.create(data);    
}

export const repoGetKPI = async() => {
    return await KPIMaster.findAll({
        include : {
            model : Organization,
            foreignKey : 'organization_code',
            attributes : ['organization_name']
        }
    });
}

export const repoGetKPIById = async(id) => {
    return await KPIMaster.findByPk(id, {
        include : {
            model : Organization,
            foreignKey : 'organization_code',
            attributes : ['organization_name']
        }
    });
}

export const repoUpdateKPI = async(data, id) => {
    await KPIMaster.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteKPI = async(id) => {
    await KPIMaster.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetKPIByYear = async(periodYear) => {
    return await KPIMaster.findAll({
        where : {
            period_year : periodYear,
        }
    });
}

export const repoGetKPIYearByOrg = async(periodYear, organizationCode) => {
    return await KPIMaster.findAll({
        where : {
            period_year : periodYear,
            organization_code : organizationCode
        }
    });
}