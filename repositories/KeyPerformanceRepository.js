import { Op, Sequelize, QueryTypes } from "sequelize";
import db from "../config/database.js";
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

export const repoReportAvgCourseCurrent = async(employeeId = '', organization = '') => {
    var param ='';
    if(employeeId != ''){
        param = `AND A.id='${employeeId}'`;
    }
    if(organization != ''){
        param = `AND A.organization_code='${organization}'`;
    }
    return await db.query(`SELECT A.*,B.target_progress_course, CASE WHEN A.average_course >= B.target_progress_course THEN 'Achived' ELSE 'Not Achived' END AS status_kpi FROM report_avg_course A, kpi_master B 
        WHERE A.organization_code=B.organization_code
        AND A.tahun=B.period_year
        AND A.tahun=DATE_FORMAT(now(),'%Y') 
        AND A.periode=DATE_FORMAT(now(),'%M')
        ${param} 
        ORDER BY A.id ASC`,{
        type : QueryTypes.SELECT
    });
}

export const repoReportAvgCoursePerMonth = async(employeeId = '', organization ='') => {
    var param =''
    if(employeeId != ''){
        param = `WHERE a.id='${employeeId}'`;
    }
    return await db.query(`SELECT 
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'January'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS January,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'February'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS February,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'March'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS March,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'April'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS April,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'May'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS May,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'June'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS June,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'July'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS July,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'August'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS August,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'September'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS September,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'October'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS October,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'November'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS November,
            IFNULL((SELECT 
                            average_course
                        FROM
                            report_avg_course
                        WHERE
                            periode = 'December'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS December
        FROM
            users a
        ${param} `, {
        type : QueryTypes.SELECT
    });
}

export const repoReportAvgExamCurrent = async(employeeId = '', organization = '') => {
    var param = '';
    if(employeeId != ''){
        param = `AND A.id='${employeeId}'`;
    }
    if(organization != ''){
        param = `AND A.organization_code='${organization}'`;
    }
    return await db.query(`SELECT A.*,B.target_average_exam, CASE WHEN A.average_exam >= B.target_average_exam THEN 'Achived' ELSE 'Not Achived' END AS status_kpi FROM report_avg_exam A, kpi_master B 
        WHERE A.organization_code=B.organization_code
        AND A.tahun=B.period_year
        AND A.tahun=DATE_FORMAT(now(),'%Y') 
        AND A.periode=DATE_FORMAT(now(),'%M')
        ${param} 
        ORDER BY A.id ASC`,{
        type : QueryTypes.SELECT
    });
}

export const repoReportAvgExamPerMonth = async(employeeId = '', organization = '') => {
    var param = '';
    if(employeeId != ''){
        param = `WHERE A.id='${employeeId}'`;
    }
    return await db.query(`SELECT 
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'January'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS January,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'February'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS February,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'March'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS March,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'April'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS April,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'May'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS May,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'June'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS June,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'July'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS July,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'August'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS August,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'September'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS September,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'October'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS October,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'November'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS November,
            IFNULL((SELECT 
                            average_exam
                        FROM
                            report_avg_exam
                        WHERE
                            periode = 'December'
                                AND tahun = DATE_FORMAT(NOW(), '%Y')
                                AND id = a.id),
                    0) AS December
        FROM
            users a
        ${param}
        `, {
            type : QueryTypes.SELECT
        })
}

export const repoGroupCourseOrganization = async(organization = '') => {
    var param ='';
    if(organization != ''){
        param = `AND a.organization_code='${organization}'`;
    }
    return await db.query(`SELECT 
            b.organization_name, COUNT(*) AS count_course
        FROM
            courses a,
            organization b
        WHERE
            a.organization_code = b.organization_code
        ${param}
        ORDER BY a.organization_code`, {
            type : QueryTypes.SELECT
        });
}