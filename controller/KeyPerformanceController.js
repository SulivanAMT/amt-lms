import { errMsg } from "../helper/Helper.js"
import { repoCreateKPI, repoDeleteKPI, repoGetKPI, repoGetKPIById, repoGetKPIByYear, repoGetKPIYearByOrg, repoUpdateKPI } from "../repositories/KeyPerformanceRepository.js";

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