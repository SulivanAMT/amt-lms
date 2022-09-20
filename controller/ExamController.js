import { calculatePointQuestion, errMsg, getProgress, lower } from "../helper/Helper.js";
import { repoCheckExamEmployee, repoCreateExam, repoCreateExamQuestion, repoDeleteExam, repoDeleteExamEmployeeAnswer, repoDeleteExamQuestion, repoEnrollExam, repoExamAnswerQuestion, repoGetExam, repoGetExamByCourse, repoGetExamById, repoGetExamEmployeeAnswer, repoGetExamEmployeeById, repoGetQuestionByExam, repoGetQuestionExam, repoGetQuestionExamById, repoSumPointByExamEmployee, repoUpdateExam, repoUpdateExamEmployee, repoUpdateExamQuestion } from "../repositories/ExamRepository.js";
import moment from 'moment';
import { repoGetCourseEmpById, repoUpdateCourseEmployee } from "../repositories/CourseRepository.js";
import { repoGetLessonByCourse, repoGetLessonEmpByCourseEmp } from "../repositories/LessonRepository.js";

export const createExam = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            course_id : req.body.course_id,
            exam_time : req.body.exam_time,
            number_of_question : req.body.number_of_question,
            passing_grade : req.body.passing_grade,
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
            passing_grade : req.body.passing_grade,
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

export const enrollExam = async(req, res) => {
    try {
        const courseEmployeeId = req.body.data.course_employee_id;
        const examId = req.body.data.exam_id;
        const pointTotal = 0;
        const startAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const status = 'In Progress';
        const exam = await repoGetExamById(examId);
        if(!exam) {
            return res.json({
                message : 'Exam tidak ditemukan',
                is_error : true
            });
        }
        const courseEmployee = await repoGetCourseEmpById(courseEmployeeId);
        const lessonEmployee = await repoGetLessonEmpByCourseEmp(courseEmployeeId);
        const lessons = await repoGetLessonByCourse(courseEmployee.course_id);
        let countLesson = 0;
        if(lessons){
            lessons.forEach((item, index) => {
                lessons[index].lessons_details.forEach(() => {
                    countLesson ++;
                });
            });
            if(lessonEmployee.length < countLesson){
                return res.json({
                    message : 'Gagal, anda belum menyelesaikan semua materi',
                    is_error : true
                });
            }
        }
        const splitTime = exam.exam_time.split(":");
        let maxTime = moment(new Date());
        if(splitTime[0] > 0){
            maxTime = maxTime.add(splitTime[0],'hours');
        }
        if(splitTime[1] > 0){
            maxTime = maxTime.add(splitTime[1], 'minutes');
        }
        if(splitTime[2] > 0){
            maxTime = maxTime.add(splitTime[2], 'seconds');
        }
        maxTime = maxTime.format('YYYY-MM-DD HH:mm:ss');
        const checkExamsEmployee = await repoCheckExamEmployee(courseEmployeeId, examId);
        if(checkExamsEmployee > 0){
            return res.json({
                message : 'Gagal, Ujian sudah pernah diambil',
                is_error : true
            });
        }
        const data = {
            course_employee_id : courseEmployeeId,
            exam_id : examId,
            point : 0,
            score : 0,
            start_at : startAt,
            max_time : maxTime,
            status : status
        };
        await repoEnrollExam(data);
        return res.json({
            message : 'Ujian telah dimulai dan batas submit pada '+maxTime,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const examAnswerQuestion = async(req, res) => {
    try {
        const examEmployeeId = req.body.data.exam_employee_id;
        const examQuestionId = req.body.data.exam_question_id;
        const answerOfQuestion = req.body.data.answer_of_question;
        const examEmployee = await repoGetExamEmployeeById(examEmployeeId);
        if(!examEmployee){
            return res.json({
                message : 'Ujian tidak ditemukan',
                is_error : true
            });
        }
        const examQuestion = await repoGetQuestionExamById(examQuestionId);
        if(!examQuestion){
            return res.json({
                message : 'Pertanyaan ujian tidak ditemukan',
                is_error : true
            });
        }
        if(examEmployee.exam_id !== examQuestion.exam_id || examEmployee.status == 'Done'){
            return res.json({
                message : 'Jawaban tidak dapat disubmit',
                is_error : true
            });
        }
        const examsEmployeeAnswer = await repoGetExamEmployeeAnswer(examEmployeeId, examQuestionId);
        if(examsEmployeeAnswer){
            if(answerOfQuestion != examsEmployeeAnswer.answer_of_question){
                await repoDeleteExamEmployeeAnswer(examsEmployeeAnswer.id);
            }else{
                return res.json({
                    message : 'Berhasil dijawab',
                    is_error : false
                });
            }
        }
        const isCorrect =  lower(examQuestion.answer_of_question) == lower(answerOfQuestion) ? 'Y' : 'T';
        const point = await calculatePointQuestion(examQuestionId, examQuestion.question_type, 'Exam');
        const data = {
            exam_employee_id : examEmployeeId,
            exam_question_id : examQuestionId,
            answer_of_question : answerOfQuestion,
            is_correct : isCorrect,
            point : isCorrect == 'Y' ? point : 0
        };
        await repoExamAnswerQuestion(data);
        return res.json({
            message : 'Berhasil dijawab',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const examSubmitAnswer = async(req, res) => {
    try {
        const examEmployeeId = req.body.data.exam_employee_id;
        const totalPoint = await repoSumPointByExamEmployee(examEmployeeId);
        const examEmployee = await repoGetExamEmployeeById(examEmployeeId);
        if(!examEmployee){
            return res.json({
                message : 'Ujian tidak ditemukan',
                is_error : true
            });
        }
        const exam = await repoGetExamById(examEmployee.exam_id);
        const passedStatus = totalPoint.total >= exam.passing_grade ? 'Passed' : 'Not Passed';
        if(examEmployee.status == 'Done'){
            return res.json({
                message : 'Ujian sudah pernah disubmit',
                is_error : true
            });
        }
        await repoUpdateExamEmployee({
            end_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            status : 'Done',
            passed_status : passedStatus,
            point : 200,
            score : totalPoint.total
        }, examEmployeeId);
        const progress = await getProgress(examEmployee.courses_employee.course_id);
        await repoUpdateCourseEmployee({
            progress : examEmployee.courses_employee.progress + progress
        }, examEmployee.courses_employee.id);
        return res.json({
            message : 'Ujian berhasil disubmit',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}