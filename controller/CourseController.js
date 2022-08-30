import { repoCreateCourse, repoCourseByID, repoGetCourse, repoDeleteCourse, repoGetCourseByOrg, repoUpdateCourse } from "../repositories/CourseRepository.js";

export const addCourse = async(req, res) => {
    try {
        const data =  {
            course_name : req.body.course_name,
            organization_code : req.body.organization_code,
            due_date : req.body.due_date,
            created_by : req.body.created_by
        };
        await repoCreateCourse(data);
        return res.json({
            message : 'Corse berhasil ditambah',
            is_error :false
        });
    } catch(err) {
        return res.json({
            is_error : true,
            message : err
        });
    }
}

export const updateCourse = async(req, res) => {
    try{
        const data = {
            course_name : req.body.course_name,
            organization_code : req.body.organization_code,
            due_date : req.body.due_date,
            created_by : req.body.created_by
        };
        await repoUpdateCourse(data, req.params.id);
        return res.json({
            message : 'Course berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteCourse = async(req, res) => {
    try {
        await repoDeleteCourse(req.params.id);
        res.json({
            message : 'Course berhasil dihapus',
            is_error : false
        });
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        })
    }
}

export const getCourse = async(req, res) => {
    try {
        const courses = await repoGetCourse();
        return res.json({
            data : courses,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getCourseById = async(req, res) => {
    try {
        const course = await repoCourseByID(req.params.id);
        return res.json({
            data : course,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getCourseByOrg = async(req, res) => {
    try {
        const course = await repoGetCourseByOrg(req.body.organization_code);
        return res.json({
            data : course,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}