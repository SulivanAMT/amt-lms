import { repoCreateLesson, repoCreateLessonContent, repoDeleteLesson, repoDeleteLessonContent, repoGetLesson, repoGetLessonByCourse, repoGetLessonById, repoGetLessonContentByLesson, repoUpdateLesson, repoUpdateLessonContent } from "../repositories/LessonRepository.js";

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
        const lessonContent = await repoGetLessonContentByLesson(req.params.lesson);
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
    // try {
        await repoDeleteLessonContent(req.params.id);
        return res.json({
            message : 'Lesson content berhasil dihapus',
            is_error : false
        })
    // } catch(err) {
    //     return res.json({
    //         message : err,
    //         is_error : true
    //     });
    // }
}

export const doneLesson = async(req, res) => {
    
}