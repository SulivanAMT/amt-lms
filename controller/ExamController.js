import { repoCreateExam, repoCreateExamQuestion, repoDeleteExam, repoDeleteExamQuestion, repoGetExam, repoGetExamByCourse, repoGetExamById, repoGetQuestionExam, repoUpdateExam, repoUpdateExamQuestion } from "../repositories/ExamRepository.js";

export const createExam = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            course_id : req.body.course_id,
            exam_time : req.body.exam_time,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        };
        await repoCreateExam(data);
        return res.json({
            message : 'Exam berhasil dibuat',
            is_error : false
        })
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const updateExam = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            course_id : req.body.course_id,
            exam_time : req.body.exam_time,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        };
        await repoUpdateExam(data, req.params.id);
        return res.json({
            message : 'Exam berhasil diupdate',
            is_error : false
        })
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteExam = async(req, res) => {
    try {
        await repoDeleteExam(req.params.id);
        return res.json({
            message : 'Exam berhasil dihapus',
            is_error : false
        });
    } catch(err){
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getExam = async(req, res) => {
    try {
        const exam = await repoGetExam();
        return res.json({
            data : exam,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getExamByCourse = async(req, res) => {
    try {
        const exam = await repoGetExamByCourse(req.body.course_id);
        return res.json({
            data : exam,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getExamById = async(req, res) => {
    try {
        const exam = await repoGetExamById(req.params.id);
        return res.json({
            data : exam,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const createExamQuestion = async(req, res) => {
    try {
        let data = {
            question : {
                exam_id : req.body.exam_id,
                name_of_question : req.body.name_of_question,
                question_number : req.body.question_number,
                answer_of_question : req.body.answer_of_question,
                question_type : req.body.question_type,
            }
        }
        if(req.body.question_type == "Multiple Choice"){
            let additionalData = {
                multiple_choice : req.body.multiple
            }
            data = Object.assign(data, additionalData);
        }
        await repoCreateExamQuestion(data);
        return res.json({
            message : 'Question berhasil ditambahkan',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const updateExamQuestion = async(req, res) => {
    try {
        let data = {
            question : {
                exam_id : req.body.exam_id,
                name_of_question : req.body.name_of_question,
                question_number : req.body.question_number,
                answer_of_question : req.body.answer_of_question,
                question_type : req.body.question_type,
            }
        }
        if(req.body.question_type == "Multiple Choice"){
            let additionalData = {
                multiple_choice : req.body.multiple
            }
            data = Object.assign(data, additionalData);
        }
        await repoUpdateExamQuestion(data, req.params.id);
        return res.json({
            message : 'Question berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteExamQuestion = async(req, res) => {
    try {
        await repoDeleteExamQuestion(req.params.id);
        return res.json({
            message : 'Question berhasil dihapus',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getQuestionByExam = async(req, res) => {
    try {
        const examQuestion = await repoGetQuestionExam(req.body.exam_id, req.body.question_number);
        return res.json({
            data : examQuestion,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}