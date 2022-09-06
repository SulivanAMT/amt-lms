import { getProgress } from "../helper/Helper.js";
import { repoGetCourseEmpById, repoUpdateCourseEmployee } from "../repositories/CourseRepository.js";
import { repoGetExamByCourse } from "../repositories/ExamRepository.js";
import { repoCompletedSubLesson, repoCreateLesson, repoCreateLessonContent, repoDeleteLesson, repoDeleteLessonContent, repoGetLesson, repoGetLessonByCourse, repoGetLessonById, repoGetLessonContentById, repoGetLessonContentByLesson, repoGetLessonsEmpByIdAndLesson, repoUpdateLesson, repoUpdateLessonContent } from "../repositories/LessonRepository.js";
import { repoGetQuizByCourse } from "../repositories/QuizRepository.js";

export const addLesson = async(req, res) => {
    try {
        const data = {
            course_id : req.body.course_id,
            lesson_title : req.body.lesson_title,
            created_by : req.body.created_by
        }
        await repoCreateLesson(data);
        res.json({
            message  : 'Lesson berhasil dibuat',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const updateLesson = async(req, res) => {
    try {
        const data = {
            course_id : req.body.course_id,
            lesson_title : req.body.lesson_title,
            created_by : req.body.created_by
        }
        await repoUpdateLesson(data, req.params.id);
        res.json({
            message  : 'Lesson berhasil diupdate',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteLesson = async(req, res) => {
    try {
        await repoDeleteLesson(req.params.id);
        return res.json({
            message : 'Lesson berhasil dihapus',
            is_error : false
        })
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getLesson = async(req, res) => {
    try {
        const lessons = await repoGetLesson();
        return res.json({
            data : lessons,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getLessonByCourse = async(req, res) => {
    try {
        const lessons = await repoGetLessonByCourse(req.body.course_id);
        return res.json({
            data : lessons,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getLessonById = async(req, res) => {
    try {
        const lessons = await repoGetLessonById(req.params.id);
        return res.json({
            data : lessons,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getLessonContentByLesson = async(req, res) => {
    try {
        const lessonContent = await repoGetLessonContentByLesson(req.body.lesson_id);
        return res.json({
            data : lessonContent,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const createLessonContent = async(req, res) => {
    try {
        const data = {
            lesson_id : req.body.lesson_id,
            lesson_detail_title : req.body.lesson_detail_title,
            lesson_content : req.body.lesson_content
        };
        await repoCreateLessonContent(data);
        return res.json({
            message : 'Lesson content berhasil ditambah',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const updateLessonContent = async(req, res) => {
    try {
        const data = {
            lesson_id : req.body.lesson_id,
            lesson_content : req.body.lesson_content,
        };
        await repoUpdateLessonContent(data, req.params.id);
        return res.json({
            message : 'Lesson content berhasil diupdate',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const deleteLessonContent = async(req, res) => {
    try {
        await repoDeleteLessonContent(req.params.id);
        return res.json({
            message : 'Lesson content berhasil dihapus',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const completedLessonContent = async(req, res) => {
    try {
        const courseEmployeeId = req.body.data.course_employee_id;
        const lessonDetailId = req.body.data.lesson_detail_id;
        const status = req.body.data.status;
        const courseEmployee = await repoGetCourseEmpById(courseEmployeeId);
        if(!courseEmployee) {
            return res.json({
                message : 'Course tidak terdaftar di list anda',
                is_error : true
            });
        }
        const lessonContent = await repoGetLessonContentById(lessonDetailId);
        if(!lessonContent) {
            return res.json({
                message : 'Sub lesson tidak ditemukan',
                is_error : true
            });
        }
        let previousLesson = lessonDetailId - 1;
        const getLesson = await repoGetLessonContentById(previousLesson);
        if(getLesson){
            const lessonEmployee = await repoGetLessonsEmpByIdAndLesson(courseEmployeeId, getLesson.id);
            if(!lessonEmployee){
                return res.json({
                    message : 'Lesson tidak dapat diselesaikan, silahkan selesaikan materi sebelumnya dahulu',
                    is_error : true
                });
            }
        }
        const data = {
            course_employee_id : courseEmployeeId,
            lesson_detail_id : lessonDetailId,
            status : status,
            point : 100
        };
        const checkCompletedLesson = await repoGetLessonsEmpByIdAndLesson(courseEmployeeId, lessonDetailId);
        if(!checkCompletedLesson){
            await repoCompletedSubLesson(data);
            await repoUpdateCourseEmployee({ progress : courseEmployee.progress + await getProgress(courseEmployee.course_id) }, courseEmployeeId);
        }
        return res.json({
            message : 'Lesson Completed',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getLessonContentById = async(req, res) => {
    try {
        const lesson = await repoGetLessonContentById(req.params.id);
        return res.json({
            data : lesson,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}