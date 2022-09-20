import sequelize from "sequelize";
import Organization from "../db/models/Organization.js";
import QuizContest from "../db/models/QuizContest.js";
import QuizContestEmployee from "../db/models/QuizContestEmployee.js";
import QuizContestEmployeeAnswer from "../db/models/QuizContestEmployeeAnswer.js";
import QuizContestMultipeChoice from "../db/models/QuizContestMultipleChoice.js";
import QuizContestPrize from "../db/models/QuizContestPrize.js";
import QuizContestQuestions from "../db/models/QuizContestQuestions.js";
import QuizContestWinner from "../db/models/QuizContestWinner.js";
import Users from "../db/models/Users.js";

export const repoGetQuizContest = async() => {
    return await QuizContest.findAll();
}

export const repoGetQuizContestById = async(id) => {
    return await QuizContest.findOne({
        where : {
            id : id
        }
    });
}

export const repoCreateQuizContest = async(data) => {
    return await QuizContest.create(data);
}

export const repoUpdateQuizContest = async(data, id) => {
    await QuizContest.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteQuizContest = async(id) => {
    await QuizContest.destroy({
        where : {
            id : id
        }
    });
}

export const repoCreateQuizContestPrize = async(data) => {
    await QuizContestPrize.bulkCreate(data);
}

export const repoDeleteQuizContestPrize = async(quizContestId) => {
    await QuizContestPrize.destroy({
        where: {
            quiz_contest_id : quizContestId
        }
    });
}

export const repoCreateQuizContestQuestion = async(data) => {
    const createQuizContestQuestion = await QuizContestQuestions.create(data.question);
    if(typeof data.multiple_choice != "undefined"){
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { contest_question_id : createQuizContestQuestion.id });
        }
        await QuizContestMultipeChoice.bulkCreate(data.multiple_choice);
    } 
}

export const repoDeleteQuizContestQuestion = async(id) => {
    const multipleChoice = QuizContestMultipeChoice.count({
        where : {
            contest_question_id : id
        }
    });
    if(multipleChoice > 0){
        await QuizContestMultipeChoice.destroy({
            where : {
                quiz_question_id : id
            }
        })
    }
    await QuizContestQuestions.destroy({
        where : {
            id : id
        }
    });
}

export const repoUpdateQuizContestQuestion = async(data, id) => {
    if(typeof data.multiple_choice != "undefined"){
        await QuizContestMultipeChoice.destroy({
            where : {
                contest_question_id : id
            }
        });
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { contest_question_id : id });
        }
        await QuizContestMultipeChoice.bulkCreate(data.multiple_choice);
    }
    await QuizContestQuestions.update(data.question, {
        where : {
            id: id
        }
    });
}

export const repoGetQuestionQuizContest = async(quizContestId, questionNumber) => {
    const quizContestQuestion = await QuizContestQuestions.findOne({
        where : {
            quiz_contest_id : quizContestId,
            question_number : questionNumber
        },
        include : [
            {
                model : QuizContestMultipeChoice,
                foreignKey : 'contest_question_id',
                attributes : ['choice_type','choice_name']
            },
            {
                model : QuizContest,
                foreignKey : 'quiz_contest_id',
                attributes : ['title','quiz_time','number_of_question']
            }
        ]
    });
    return quizContestQuestion;
}

export const repoGetQuestionQuizContestById = async(id) => {
    return await QuizContestQuestions.findOne({
        where : {
            id : id
        }
    });
}

export const repoGetQuestionByQuizContest = async(quizContestId) => {
    return await QuizContestQuestions.findAll({
        where : {
            quiz_contest_id : quizContestId
        }
    });
}

export const repoEnrollQuiz = async(data) => {
    await QuizContestEmployee.create(data);
}

export const repoQuizContestAnswerQuestion = async(data) => {
    await QuizContestEmployeeAnswer.bulkCreate(data);
}

export const repoCheckQuizContestEmployee = async(employeeId, quizContestId) => {
    return await QuizContestEmployee.findOne({
        include : {
            model : Users,
            foreignKey : 'employee_id',
            attributes : ['id','name','email']
        },
        where : {
            employee_id : employeeId,
            quiz_contest_id : quizContestId
        }
    });
}

export const repoEnrollQuizContest = async(data) => {
    await QuizContestEmployee.create(data);
}

export const repoGetQuizContestEmployeeById = async(id) => {
    return await QuizContestEmployee.findOne({
        where : {
            id : id
        }
    });
}

export const repoGetQuizContestEmployeeAnswer = async(contestEmployeeId, contestQuestionId) => {
    return await QuizContestEmployeeAnswer.findOne({
        where : {
            contest_employee_id : contestEmployeeId,
            contest_question_id : contestQuestionId
        }
    });
}

export const repoDeleteQuizContestEmployeeAnswer = async(id) => {
    await QuizContestEmployeeAnswer.destroy({
        where : {
            id :id
        }
    });
}

export const repoSumPointByQuizContestEmp = async(contestEmployeeId) => {
    return await QuizContestEmployeeAnswer.findOne({
        attributes : [[ sequelize.fn('sum', sequelize.col('point')),'total']],
        where : {
            contest_employee_id : contestEmployeeId
        },
        raw : true
    }); 
}

export const repoUpdateQuizContestEmp = async(data, id) => {
    await QuizContestEmployee.update(data, {
        where : {
            id : id
        }
    });
}

export const repoGetPrizeByQuizContest= async(quizContestId) => {
    return await QuizContestPrize.findAll({
        where : {
            quiz_contest_id : quizContestId
        },
        include : {
            model : QuizContestWinner,
            foreignKey : 'prize_id',
            attributes : ['employee_id'],
            include : {
                model : Users,
                foreignKey : 'employee_id',
                attributes : ['name', 'email'],
                include : {
                    model : Organization,
                    foreignKey : 'organization_code',
                    attributes : ['organization_code','organization_name']
                }
            }
        }
    });
}

export const repoCreateQuizContestWinner = async(data) => {
    await QuizContestWinner.bulkCreate(data);
}

export const repoDeleteQuizContestWinner = async(prizeId) => {
    await QuizContestWinner.destroy({
        where : {
            prize_id : prizeId
        }
    });
}