import { calculatePointQuestion, errMsg, lower } from "../helper/Helper.js"
import { repoCheckQuizContestEmployee, repoCreateQuizContest, repoCreateQuizContestPrize, repoCreateQuizContestQuestion, repoCreateQuizContestWinner, repoDeleteQuizContest, repoDeleteQuizContestEmployeeAnswer, repoDeleteQuizContestPrize, repoDeleteQuizContestQuestion, repoDeleteQuizContestWinner, repoEnrollQuizContest, repoGetPrizeByQuizContest, repoGetQuestionByQuizContestEmp, repoGetQuestionQuizContest, repoGetQuestionQuizContestById, repoGetQuizContest, repoGetQuizContestByEmp, repoGetQuizContestById, repoGetQuizContestEmployeeAnswer, repoGetQuizContestEmployeeById, repoGetResultQuizContest, repoGetResultQuizContestByEmployee, repoGetResultQuizContestByOrg, repoGetWinner, repoQuizContestAnswerQuestion, repoSumPointByQuizContestEmp, repoUpdateQuizContest, repoUpdateQuizContestEmp, repoUpdateQuizContestQuestion } from "../repositories/QuizContestRepository.js"
import { repoGetQuestionQuizById, repoGetQuizEmployeeById } from "../repositories/QuizRepository.js";
import moment from "moment";

export const getQuizContest = async(req, res) => {
    try {
        const quizContest = await repoGetQuizContest();
        return res.json({
            data : quizContest,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getQuizContestById = async(req, res) => {
    try {
        const quizContest = await repoGetQuizContestById(req.params.id);
        return res.json({
            data : quizContest,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const createQuizContest = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            description : req.body.description,
            quiz_time : req.body.quiz_time,
            due_date : req.body.due_date,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        }
        if(typeof req.body.prize !== "undefined"){
            if(req.body.prize.length == 0 || req.body.prize == null){
                return res.json({
                    message : 'Prize tidak boleh kosong',
                    is_error : true
                })
            }
        }else {
            return res.json({
                message : 'Error has ocured',
                is_error : true
            });
        }
        if(req.body.due_date < new Date().toISOString().slice(0, 10)){
            return res.json({
                message : 'Tanggal due date harus lebih besar atau sama dari tanggal hari ini',
                is_error : true
            });
        } 
        const create = await repoCreateQuizContest(data);
        for(var i = 0; i < req.body.prize.length; i++) {
            Object.assign(req.body.prize[i], { quiz_contest_id : create.id });
        }
        await repoCreateQuizContestPrize(req.body.prize);
        return res.json({
            message : 'Quiz contest berhasil ditambahkan',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const updateQuizContest = async(req, res) => {
    try {
        const data = {
            title : req.body.title,
            description : req.body.description,
            quiz_time : req.body.quiz_time,
            due_date : req.body.due_date,
            number_of_question : req.body.number_of_question,
            created_by : req.body.created_by
        }
        if(typeof req.body.prize !== undefined){
            if(req.body.prize.length == 0 || req.body.prize == null){
                return res.json({
                    message : 'Prize tidak boleh kosong',
                    is_error : true
                })
            }
        }else {
            return res.json({
                message : 'Error has ocured',
                is_error : true
            });
        }
        if(req.body.due_date < new Date().toISOString().slice(0, 10)){
            return res.json({
                message : 'Tanggal due date harus lebih besar atau sama dari tanggal hari ini',
                is_error : true
            });
        } 
        const quizContest = await repoGetQuizContestById(req.params.id);
        if(!quizContest) {
            return res.json({
                message : 'Data tidak ditemukan',
                is_error : true
            });
        }
        await repoUpdateQuizContest(data, req.params.id);
        await repoDeleteQuizContestPrize(req.params.id);
        for(var i = 0; i < req.body.prize.length; i++){
            Object.assign(req.body.prize[i], { quiz_contest_id : req.params.id });
        }
        await repoCreateQuizContestPrize(req.body.prize);
        return res.json({
            message : 'Quiz contest berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const deleteQuizContest = async(req, res) => {
    try {
        const quizContest = await repoGetQuizContestById(req.params.id);
        if(!quizContest) {
            return res.json({
                message : 'Data tidak ditemukan',
                is_error : true
            });
        }
        await repoDeleteQuizContest(req.params.id);
        return res.json({
            message : 'Quiz contest berhasil dihapus',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const createQuizContestQuestion = async(req, res) => {
    try {
        let data = {
            question : {
                quiz_contest_id : req.body.quiz_contest_id,
                name_of_question : req.body.name_of_question,
                question_number : req.body.question_number,
                answer_of_question : req.body.answer_of_question,
                question_type : req.body.question_type,
            }
        }
        const quizContest = await repoGetQuizContestById(req.body.quiz_contest_id);
        if(!quizContest){
            return res.json({
                message : 'Quiz contest tidak ditemukan',
                is_error : true
            });
        }
        if(req.body.question_type == "Multiple Choice"){
            let additionalData = {
                multiple_choice : req.body.multiple
            }
            data = Object.assign(data, additionalData);
        }
        await repoCreateQuizContestQuestion(data);
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

export const updateQuizContestQuestion = async(req, res) => {
    try {
        let data = {
            question : {
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
        const quizContest = await repoGetQuestionQuizContestById(req.params.id);
        if(!quizContest) {
            return res.json({
                message : 'Data tidak ditemukan',
                is_error : true
            });
        }
        await repoUpdateQuizContestQuestion(data, req.params.id);
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

export const deleteQuizContestQuestion = async(req, res) => {
    try {
        const quizContestQuestion = await repoGetQuestionQuizContestById(req.params.id);
        if(!quizContestQuestion){
            return res.json({
                message : 'Data tidak ditemukan',
                is_error : true
            });
        }
        await repoDeleteQuizContestQuestion(req.params.id);
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

export const getQuestionByQuizContest = async(req, res) => {
    try {
        const quizContestQuestion = await repoGetQuestionQuizContest(req.body.quiz_contest_id, req.body.question_number);
        return res.json({
            data : quizContestQuestion,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getPrizeByQuizContest = async(req, res) => {
    try {
        const quizContest = await repoGetQuizContestById(req.params.id);
        if(!quizContest){
            return res.json({
                message : 'Quiz Contest tidak ditemukan',
                is_error : true
            })
        }
        const winner = await repoGetPrizeByQuizContest(req.params.id);
        return res.json({
            data : winner,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error: true
        })
    }
}

export const enrollQuizContest = async(req, res) => {
    try {
        const employeeId = req.body.data.employee_id;
        const quizContestId = req.body.data.quiz_contest_id;
        const startAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const status = 'In Progress';
        const quizContest = await repoGetQuizContestById(quizContestId);
        if(!quizContest) {
            return res.json({
                message : 'Quiz Contest tidak ditemukan',
                is_error : true
            });
        }
        let maxTime = moment(new Date());
        maxTime = maxTime.add(quizContest.quiz_time, 'minutes');
        maxTime = maxTime.format('YYYY-MM-DD HH:mm:ss');
        const quizEmployee = await repoCheckQuizContestEmployee(employeeId, quizContestId);
        if(quizEmployee){ //jika quiz ingin di retake
            if(quizEmployee.status != 'Done'){
                return res.json({
                    message : 'Quiz Contest sudah dimulai',
                    is_error : false
                });
            }else{
                return res.json({
                    message : 'Anda sudah mengerjakan quiz contest ini',
                    is_error : true
                });
            }
        }
        const data = {
            employee_id : employeeId,
            quiz_contest_id : quizContestId,
            score : 0,
            start_at : startAt,
            max_time : maxTime,
            status : status
        };
        await repoEnrollQuizContest(data);
        return res.json({
            message : 'Quiz contest telah dimulai dan batas submit pada '+maxTime,
            is_error : false
        });        
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const quizContestAnswer = async(req, res) => {
    try {
        const contestEmployeeId = req.body.data.contest_employee_id;
        const contestQuestionId = req.body.data.contest_question_id;
        const answerOfQuestion = req.body.data.answer_of_question;
        const quizContestEmployee = await repoGetQuizContestEmployeeById(contestEmployeeId);
        if(!quizContestEmployee){
            return res.json({
                message : 'Quiz contest tidak ditemukan',
                is_error : true
            });
        }
        const quizContestQuestion = await repoGetQuestionQuizContestById(contestQuestionId);
        if(!quizContestQuestion){
            return res.json({
                message : 'Pertanyaan quiz contest tidak ditemukan',
                is_error : true
            });
        }
        if(quizContestEmployee.quiz_contest_id !== quizContestQuestion.quiz_contest_id || quizContestEmployee.status == 'Done'){
            return res.json({
                message : 'Jawaban tidak dapat disubmit',
                is_error : true
            });
        }
        if(answerOfQuestion == null) {
            return res.json({
                message : 'Gagal save, jawaban kosong',
                is_error : true
            })
        }
        const quizContestEmployeeAnswer = await repoGetQuizContestEmployeeAnswer(contestEmployeeId, contestQuestionId);
        if(quizContestEmployeeAnswer){
            if(answerOfQuestion != quizContestEmployeeAnswer.answer_of_question){
                await repoDeleteQuizContestEmployeeAnswer(quizContestEmployeeAnswer.id);
            }else{
                return res.json({
                    message : 'Berhasil dijawab',
                    is_error : false
                });
            }
        }
        const isCorrect =  lower(quizContestQuestion.answer_of_question) == lower(answerOfQuestion) ? 'Y' : 'T';
        const point = await calculatePointQuestion(contestQuestionId, quizContestQuestion.question_type,'Quiz Contest');
        const data = {
            contest_employee_id : contestEmployeeId,
            contest_question_id : contestQuestionId,
            answer_of_question : answerOfQuestion,
            is_correct : isCorrect,
            point : isCorrect == 'Y' ? point : 0
        };
        await repoQuizContestAnswerQuestion(data);
        return res.json({
            message : 'Berhasil dijawab',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const quizContestSubmit = async(req, res) => {
    try {
        const contestEmployeeId = req.body.data.contest_employee_id;
        const totalPoint = await repoSumPointByQuizContestEmp(contestEmployeeId);
        const quizContestEmployee = await repoGetQuizContestEmployeeById(contestEmployeeId);
        if(!quizContestEmployee){
            return res.json({
                message : 'Quiz contest tidak ditemukan',
                is_error : true
            });
        }
        if(quizContestEmployee.status == 'Done'){
            return res.json({
                message : 'Anda sudah menyelesaikan quiz contest ini',
                is_error : true
            });
        }
        await repoUpdateQuizContestEmp({
            end_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            status : 'Done',
            score : totalPoint.total
        }, contestEmployeeId);
        return res.json({
            message : 'Quiz contest berhasil disubmit',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const setTheWinnerQuizContest = async(req, res) => {
    try {
        const prize = await repoGetPrizeByQuizContest(req.body.quiz_contest_id);
        if(!prize){
            return res.json({
                message : 'Prize tidak ditemukan',
                is_error : true
            });
        }
        if(typeof req.body.winner == "undefined"){
            return res.json({
                message : 'Data pemenang tidak ditemukan',
                is_error : true
            });
        }
        var isValidEmployee = true;
        var employee = '';
        for(var i = 0; i < req.body.winner.length; i++){
            employee = await repoCheckQuizContestEmployee(req.body.winner[i].employee_id, req.body.quiz_contest_id);
            if(!employee){
                isValidEmployee = false
            }
        }
        if(isValidEmployee == false){
            return res.json({
                message : 'Gagal, employee tersebut tidak mengikuti quiz contest, mohon agar dicek kembali',
                is_error : true
            })
        }
        for(var x = 0; x < prize.length; x++){
            if(prize[x].quiz_contest_winner != null){
                await repoDeleteQuizContestWinner(prize[x].id);
            }
        }
        await repoCreateQuizContestWinner(req.body.winner);
        return res.json({
            message : 'Pemenang telah disubmit',
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : false
        });
    } 
}

export const getQuizContestByEmployee = async(req, res) => {
    try {
        const quizContestId = req.body.quiz_contest_id;
        const employeeId= req.body.employee_id;
        const quizContest = await repoGetQuizContestByEmp(quizContestId, employeeId);
        return res.json({
            data : quizContest,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getQuestionByQuizContestEmp = async(req, res) => {
    try {
        const quizContestQuestion = await repoGetQuestionByQuizContestEmp(req.body.quiz_contest_employee_id, req.body.question_number);
        return res.json({
            data : quizContestQuestion,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getResultQuizContest = async(req, res) => {
    try {
        let result = [];
        if(req.body.type == "all"){
            result = await repoGetResultQuizContest();
        }
        else if(req.body.type == "employee") {
            result = await repoGetResultQuizContestByEmployee(req.body.id);
        }
        else if(req.body.type == "organization") {
            result = await repoGetResultQuizContestByOrg(req.body.id);
        }
        return res.json({
            data : result,
            is_error : false
        })
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}

export const getWinner = async(req, res) => {
    try {
        let data = [];
        const winner = await repoGetWinner();
        for(var i = 0; i < winner.length; i++){
            if(winner[i].quiz_contest_winner != null) {
                data.push(winner[i].quiz_contest_winner);
            }
        }
        return res.json({
            data : data,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}