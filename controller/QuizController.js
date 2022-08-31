import { repoCreateQuiz, repoCreateQuizQuestion, repoDeleteQuiz, repoDeleteQuizQuestion, repoGetQuestionQuiz, repoGetQuiz, repoGetQuizByCourse, repoGetQuizById, repoUpdateQuiz, repoUpdateQuizQuestion } from "../repositories/QuizRepository.js";

export const createQuiz = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            course_id : req.body.course_id,
            quiz_time : req.body.quiz_time,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        };
        await repoCreateQuiz(data);
        return res.json({
            message : 'Quiz berhasil dibuat',
            is_error : false
        })
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const updateQuiz = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            course_id : req.body.course_id,
            quiz_time : req.body.quiz_time,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        };
        await repoUpdateQuiz(data, req.params.id);
        return res.json({
            message : 'Quiz berhasil diupdate',
            is_error : false
        })
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteQuiz = async(req, res) => {
    try {
        await repoDeleteQuiz(req.params.id);
        return res.json({
            message : 'Quiz berhasil dihapus',
            is_error : false
        });
    } catch(err){
        return res.json({
            message : err,
            is_error : true
        })
    }
}

export const getQuiz = async(req, res) => {
    try {
        const quiz = await repoGetQuiz();
        return res.json({
            data : quiz,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getQuizByCourse = async(req, res) => {
    try {
        const quiz = await repoGetQuizByCourse(req.body.course_id);
        return res.json({
            data : quiz,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getQuizById = async(req, res) => {
    try {
        const quiz = await repoGetQuizById(req.params.id);
        return res.json({
            data : quiz,
            is_error : false
        });
    }catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const createQuizQuestion = async(req, res) => {
    try {
        let data = {
            question : {
                quiz_id : req.body.quiz_id,
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
        await repoCreateQuizQuestion(data);
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

export const updateQuizQuestion = async(req, res) => {
    try {
        let data = {
            question : {
                quiz_id : req.body.quiz_id,
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
        await repoUpdateQuizQuestion(data, req.params.id);
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

export const deleteQuizQuestion = async(req, res) => {
    try {
        await repoDeleteQuizQuestion(req.params.id);
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

export const getQuestionByQuiz = async(req, res) => {
    try {
        const quizQuestion = await repoGetQuestionQuiz(req.body.quiz_id, req.body.question_number);
        return res.json({
            data : quizQuestion,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}