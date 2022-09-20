import { repoCreateCourse, repoCourseByID, repoGetCourse, repoDeleteCourse, repoGetCourseByOrg, repoUpdateCourse, repoCheckCourseEmployee, repoCreateCourseEmployee } from "../repositories/CourseRepository.js";
import { repoUserById } from "../repositories/UserRepository.js";
import moment from 'moment';

export const addCourse = async(req, res) => {
    try {
        const data =  {
            course_name : req.body.course_name,
            description : req.body.description,
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
            description : req.body.description,
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

export const enrollCourse = async(req ,res) => {
    try {
        const courseId = req.body.data.course_id;
        const employeeId = req.body.data.employee_id;
        const course = await repoCourseByID(courseId);
        if(!course){
            return res.json({
                message : 'Course tidak ditemukan',
                is_error : true
            });
        }
        const now = moment(new Date()).format('YYYY-MM-DD');
        if(course.due_date < now){
            return res.json({
                message : 'Course sudah kadaluarsa',
                is_error : true
            });
        }
        const user = await repoUserById(employeeId);
        if(!user) {
            return res.json({
                message : 'Employee tidak ditemukan',
                is_error : true
            });
        }
        const courseEmployee = await repoCheckCourseEmployee(courseId, employeeId);
        if(courseEmployee){
            return res.json({
                message : 'Anda sudah mengambil course ini',
                is_error : true
            });
        }
        const data = {
            employee_id : employeeId,
            course_id : courseId,
            progress : 0,
            status : 'In Progress'
        };
        await repoCreateCourseEmployee(data);
        return res.json({
            message : 'Course berhasil di enroll',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const unEnrollCourse = async(req, res) => {

}

export const getMyCourses = async(req, res) => {

}

export const updateCourseEmployee = async(req, res) => {

}