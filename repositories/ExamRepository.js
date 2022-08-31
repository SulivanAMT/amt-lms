import Courses from "../db/models/Courses.js";
import Exams from "../db/models/Exams.js";
import ExamsMultipleChoice from "../db/models/ExamsMultipleChoice.js";
import ExamsQuestions from "../db/models/ExamsQuestions.js";
import Organization from "../db/models/Organization.js";

export const repoCreateExam = async(data) => {
    await Exams.create(data);
}

export const repoUpdateExam = async(data ,id) => {
    await Exams.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteExam = async(id) => {
    await Exams.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetExam = async() => {
    return await Exams.findAll({
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

export const repoGetExamById = async(id) => {
    return await Exams.findByPk(id,{
        include : {
            model : Courses,
            foreignKey : 'course_id'
        }
    });
}

export const repoGetExamByCourse = async(course) => {
    return await Exams.findOne({
        where : {
            course_id : course
        }
    });
}

export const repoCreateExamQuestion = async(data) => {
    const createExamQuestion = await ExamsQuestions.create(data.question);
    if(typeof data.multiple_choice != "undefined"){
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { exam_question_id : createExamQuestion.id });
        }
        await ExamsMultipleChoice.bulkCreate(data.multiple_choice);
    } 
}

export const repoDeleteExamQuestion = async(id) => {
    const multipleChoice = ExamsMultipleChoice.count({
        where : {
            exam_question_id : id
        }
    });
    if(multipleChoice > 0){
        await ExamsMultipleChoice.destroy({
            where : {
                exam_question_id : id
            }
        })
    }
    await ExamsQuestions.destroy({
        where : {
            id : id
        }
    });
}

export const repoUpdateExamQuestion = async(data, id) => {
    if(typeof data.multiple_choice != "undefined"){
        await ExamsMultipleChoice.destroy({
            where : {
                exam_question_id : id
            }
        });
        var i;
        for(i = 0; i < data.multiple_choice.length; i++){
            Object.assign(data.multiple_choice[i], { exam_question_id : id });
        }
        await ExamsMultipleChoice.bulkCreate(data.multiple_choice);
    }
    await ExamsQuestions.update(data.question, {
        where : {
            id: id
        }
    });
}

export const repoGetQuestionExam = async(exam, questionNumber) => {
    const examQuestion = await ExamsQuestions.findAll({
        where : {
            exam_id : exam,
            question_number : questionNumber
        },
        include : [
            {
                model : ExamsMultipleChoice,
                foreignKey : 'exam_question_id',
                attributes : ['choice_type','choice_name']
            },
            {
                model : Exams,
                foreignKey : 'exam_id',
                attributes : ['title','course_id','exam_time','number_of_question']
            }
        ]
    });
    return examQuestion;
}