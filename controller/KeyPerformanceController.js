import { errMsg } from "../helper/Helper.js"
import { repoGetCourse, repoGetCourseByOrg, repoGetCoursesEmployee } from "../repositories/CourseRepository.js";
import { repoCreateKPI, repoDeleteKPI, repoGetKPI, repoGetKPIById, repoGetKPIByYear, repoGetKPIYearByOrg, repoGroupCourseOrganization, repoReportAvgCourseCurrent, repoReportAvgCoursePerMonth, repoReportAvgExamCurrent, repoReportAvgExamPerMonth, repoUpdateKPI } from "../repositories/KeyPerformanceRepository.js";
import { repoGetOrganization, repoGetOrganizationByCode, repoGetUser, repoGetUserByOrg, repoUserById } from "../repositories/UserRepository.js";

export const createKPI = async(req, res) => {
    try {
        const data = {
            target_progress_course : req.body.target_progress_course,
            target_average_exam : req.body.target_average_exam,
            period_year : req.body.period_year,
            organization_code : req.body.organization_code
        };
        const kpi = await repoGetKPIByYear(data.period_year);
        if(kpi.length > 0){
            return res.json({
                message : 'Gagal, KPI sudah dibuat',
                is_error : true
            });
        }
        await repoCreateKPI(data);
        return res.json({
            message : 'KPI berhasil dibuat',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getKPI = async(req, res) => {
    try {  
        const kpi = await repoGetKPI();
        return res.json({
            data : kpi,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getKPIById = async(req, res) => {
    try {  
        const kpi = await repoGetKPIById(req.params.id);
        return res.json({
            data : kpi,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const updateKPI = async(req, res) => {
    try {
        const data = {
            target_progress_course : req.body.target_progress_course,
            target_average_exam : req.body.target_average_exam,
            period_year : req.body.period_year,
            organization_code : req.body.organization_code
        };
        const old = await repoGetKPIById(req.params.id);
        const kpi = await repoGetKPIYearByOrg(data.period_year, data.organization_code);
        if(kpi.length > 0 && old.period_year != data.period_year){
            return res.json({
                message : `Gagal, KPI tahun ${data.period_year} untuk organisasi tersebut sudah dibuat`,
                is_error : true
            });
        }
        await repoUpdateKPI(data, req.params.id);
        return res.json({
            message : 'KPI berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const deleteKPI = async(req, res) => {
    try {
        const kpi = await repoGetKPIById(req.params.id);
        if(!kpi) {
            return res.json({
                message : 'Data KPI tidak ditemukan',
                is_error : true
            });
        }
        await repoDeleteKPI(req.params.id);
        return res.json({
            message : 'KPI berhasil dihapus',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : false
        })
    }
}

export const reportDashboard = async(req, res) => {
    try {
        const user = await repoUserById(req.body.employee_id);
        if(user.role.roles == 'CMO'){
            var data = [];
            const kpiCourse = await repoReportAvgCourseCurrent(req.body.employee_id);
            const countCourse = await repoGetCourseByOrg(user.organization.organization_code);
            const kpiCoursePerMonth = await repoReportAvgCoursePerMonth(req.body.employee_id);
            const kpiExamPerMonth = await repoReportAvgExamPerMonth(req.body.employee_id);
            const kpiExam = await repoReportAvgExamCurrent(req.body.employee_id);
            return res.json({
                data : {
                    course_report : kpiCoursePerMonth,
                    exam_report : kpiExamPerMonth,
                    count_course : countCourse.length,
                    average_course : kpiCourse[0].average_course,
                    target_average_course : kpiCourse[0].target_progress_course,
                    average_exam : kpiExam[0].average_exam,
                    target_average_exam : kpiCourse[0].target_average_exam
                },
                is_error : false
            });
        }
        else if(user.role.roles == 'HRD' || user.role.roles == 'ADM'){
            const kpiCourse = await repoReportAvgCourseCurrent();
            const kpiExam = await repoReportAvgExamCurrent();
            const groupCourse = await repoGroupCourseOrganization();
            const countEmployees = await repoGetUser();
            const countCourse = await repoGetCourse();
            const countOrg = await repoGetOrganization();
            var avgExam = [];
            var avgCourse = [];
            kpiExam.map((exam, i)=> {
                avgExam.push({
                    name : exam.name,
                    average_exam : exam.average_exam
                });
            });
            kpiCourse.map((course, i) => {
                avgCourse.push({
                    name : course.name,
                    average_course : course.average_course
                });
            })
            return res.json({
                data : {
                    count_users : countEmployees.length,
                    average_exam : avgExam,
                    average_course : avgCourse,
                    group_course : groupCourse,
                    count_course : countCourse.length,
                    count_org : countOrg.length
                },
                is_error : false
            });
        } 
        else {
            const kpiCourse = await repoReportAvgCourseCurrent('', user.organization.organization_code);
            const kpiExam = await repoReportAvgExamCurrent('', user.organization.organization_code);
            const groupCourse = await repoGroupCourseOrganization(user.organization.organization_code);
            const countEmployees = await repoGetUserByOrg(user.organization.organization_code);
            const countCourse = await repoGetCourseByOrg(user.organization.organization_code);
            const countOrg = await repoGetOrganizationByCode(user.organization.organization_code);
            var avgExam = [];
            var avgCourse = [];
            kpiExam.map((exam, i)=> {
                avgExam.push({
                    name : exam.name,
                    average_exam : exam.average_exam
                });
            });
            kpiCourse.map((course, i) => {
                avgCourse.push({
                    name : course.name,
                    average_course : course.average_course
                });
            })
            return res.json({
                data : {
                    count_users : countEmployees.length,
                    average_exam : avgExam,
                    average_course : avgCourse,
                    group_course : groupCourse,
                    count_course : countCourse.length,
                    count_org : countOrg.length
                },
                is_error : false
            });
        }
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getReportKPI = async(req, res) => {
    try {
        var organization, employeeId = '';
        if(typeof req.body.organization_code != 'undefined'){
            organization = req.body.organization_code;
        }
        if(typeof req.body.employee_id != 'undefined'){
            employeeId = req.body.employee_id;
        }
        const kpiCourse = await repoReportAvgCourseCurrent(employeeId, organization);
        const kpiExam = await repoReportAvgExamCurrent(employeeId, organization);
        var data = [];
        kpiExam.map((exam, i)=> {
            data.push({
                employee_id : exam.id,
                name : exam.name,
                score : exam.average_exam + ' Point',
                target : exam.target_average_exam + ' Point',
                status : exam.status_kpi,
                type: 'Exam',
                organization : exam.organization_name,
                periode : exam.periode,
                tahun : exam.tahun,
                tgl_generate : exam.tgl_generate
            });
        });
        kpiCourse.map((course, i) => {
            data.push({
                employee_id : course.id,
                name : course.name,
                score : course.average_course + ' %',
                target : course.target_progress_course + ' %',
                type : 'Course',
                status : course.status_kpi,
                organization : course.organization_name,
                periode : course.periode,
                tahun : course.tahun,
                tgl_generate : course.tgl_generate
            });
        });
        data.sort((a, b) => parseFloat(a.employee_id) - parseFloat(b.employee_id));
        return res.json({
            data : data,
            is_error : false
        })
    } catch(err){
        return res.json({
            message : errMsg(err),
            is_error : false
        })
    }
}

export const getReportCourse = async(req, res) => {
    try {
        const reportCourse = await repoGetCoursesEmployee();
        return res.json({
            data : reportCourse,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}