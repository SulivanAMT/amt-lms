import Courses from "../db/models/Courses.js";
import Quiz from "../db/models/Quiz.js";
import QuizMultipleChoice from "../db/models/QuizMultipleChoice.js";
import QuizQuestions from "../db/models/QuizQuestions.js";
import Organization from "../db/models/Organization.js";
import QuizEmployee from "../db/models/QuizEmployee.js";
import QuizEmployeeAnswer from "../db/models/QuizEmployeeAnswer.js";
import CoursesEmployee from "../db/models/CoursesEmployee.js";
import Sequelize from "sequelize";

export const repoCreateQuiz = async(data) => {
    await Quiz.create(data);
}

export const repoUpdateQuiz = async(data ,id) => {
    await Quiz.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteQuiz = async(id) => {
    await Quiz.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetQuiz = async() => {
    return await Quiz.findAll({
        include : {
            model : Courses,
            foreignKey : 'course_id',
            attributes : ['course_name'],
            include : {
                model : Organization,
                foreignKey : 'organizaztion_code',
                attributes : ['organization_code', 'organization_name']
            }
        }
    });
}

export const repoGetQuizById = async(id) => {
    return await Quiz.findByPk(id,{
        include : {
            model : Courses,
            foreignKey : 'course_id'
        }
    });
}

export const repoGetQuizByCourse = async(course) => {
    return await Quiz.findAll({
        where : {
            course_id : course
        }
    });
}

export const repoCreateQuizQuestion = async(data) => {
    const createQuizQuestion = await QuizQuestions.create(data.question);
    if(typeof data.multiple_choice != "undefined"){
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { quiz_question_id : createQuizQuestion.id });
        }
        await QuizMultipleChoice.bulkCreate(data.multiple_choice);
    } 
}

export const repoDeleteQuizQuestion = async(id) => {
    const multipleChoice = QuizMultipleChoice.count({
        where : {
            quiz_question_id : id
        }
    });
    if(multipleChoice > 0){
        await QuizMultipleChoice.destroy({
            where : {
                quiz_question_id : id
            }
        })
    }
    await QuizQuestions.destroy({
        where : {
            id : id
        }
    });
}

export const repoUpdateQuizQuestion = async(data, id) => {
    if(typeof data.multiple_choice != "undefined"){
        await QuizMultipleChoice.destroy({
            where : {
                quiz_question_id : id
            }
        });
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { quiz_question_id : id });
        }
        await QuizMultipleChoice.bulkCreate(data.multiple_choice);
    }
    await QuizQuestions.update(data.question, {
        where : {
            id: id
        }
    });
}

export const repoGetQuestionQuiz = async(quiz, questionNumber) => {
    const quizQuestion = await QuizQuestions.findOne({
        where : {
            quiz_id : quiz,
            question_number : questionNumber
        },
        include : [
            {
                model : QuizMultipleChoice,
                foreignKey : 'quiz_question_id',
                attributes : ['choice_type','choice_name']
            },
            {
                model : Quiz,
                foreignKey : 'quiz_id',
                attributes : ['title','course_id','quiz_time','number_of_question']
            }
        ]
    });
    return quizQuestion;
}

export const repoGetQuestionQuizById = async(id) => {
    return await QuizQuestions.findOne({
        where : {
            id : id
        }
    });
}

export const repoGetQuestionByQuiz = async(quizId) => {
    return await QuizQuestions.findAll({
        where : {
            quiz_id : quizId
        }
    });
}

export const repoEnrollQuiz = async(data) => {
    await QuizEmployee.create(data);
}

export const repoQuizAnswerQuestion = async(data) => {
    await QuizEmployeeAnswer.create(data);
}

export const repoCheckQuizEmployee = async(courseEmployeeId, quizId) => {
    return await QuizEmployee.findOne({
        include : {
            model : CoursesEmployee,
            foreignKey : 'course_employee_id'
        },
        where : {
            course_employee_id : courseEmployeeId,
            quiz_id : quizId
        }
    });
}

export const repoUnEnrollQuiz = async(quizEmployeeId) => {
    await QuizEmployee.destroy({
        where : {
            id : quizEmployeeId
        }
    });
}

export const repoGetQuizEmployeeById = async(id) => {
    return await QuizEmployee.findOne({
        include : {
            model : CoursesEmployee,
            foreignKey : 'course_employee_id'
        },
        where : {
            id : id
        }
    });
}

export const repoGetQuizEmployeeAnswer = async(quizEmployeeId, quizQuestionId) => {
    return await QuizEmployeeAnswer.findOne({
        where : {
            quiz_employee_id : quizEmployeeId,
            quiz_question_id : quizQuestionId
        }
    });
}

export const repoDeleteQuizEmployeeAnswer = async(id) => {
    await QuizEmployeeAnswer.destroy({
        where : {
            id :id
        }
    });
}

export const repoSumPointByQuizEmp = async(quizEmployeeId) => {
    return await QuizEmployeeAnswer.findOne({
        attributes : [[ Sequelize.fn('sum', Sequelize.col('point')),'total']],
        where : {
            quiz_employee_id : quizEmployeeId
        },
        raw : true
    }); 
}

export const repoUpdateQuizEmp = async(data, id) => {
    await QuizEmployee.update(data, {
        where : {
            id : id
        }
    });
}