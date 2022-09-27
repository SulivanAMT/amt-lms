import { Op, where } from "sequelize";
import { Sequelize } from "sequelize";
import Courses from "../db/models/Courses.js";
import CoursesEmployee from "../db/models/CoursesEmployee.js";
import Exams from "../db/models/Exams.js";
import ExamsEmployee from "../db/models/ExamsEmployee.js";
import ExamsEmployeeAnswer from "../db/models/ExamsEmployeeAnswer.js";
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
        include : [
            {
                model : Courses,
                foreignKey : 'course_id'
            },
            {
                model : ExamsQuestions,
                foreignKey : 'quiz_id'
            }
        ]
    });
}

export const repoGetExamByCourse = async(course) => {
    return await Exams.findAll({
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
    const examQuestion = await ExamsQuestions.findOne({
        where : {
            exam_id : exam,
            question_number : questionNumber
        },
        include : [
            {
                model : ExamsMultipleChoice,
                foreignKey : 'exam_question_id',
                attributes : ['choice_type','choice_name']
            }
        ]
    });
    return examQuestion;
}

export const repoGetQuestionExamById = async(id) => {
    return await ExamsQuestions.findOne({
        where : {
            id : id
        }
    });
}

export const repoGetQuestionByExam = async(examId) => {
    return await ExamsQuestions.findAll({
        where : {
            exam_id : examId
        }
    });
}

export const repoGetExamEmployeeById = async(id) => {
    return await ExamsEmployee.findOne({
        include : {
            model : CoursesEmployee,
            foreignKey : 'course_employee_id'
        },
        where : {
            id : id
        }
    });
}

export const repoCheckExamEmployee = async(courseEmployeeId, examId) => {
    return await ExamsEmployee.findOne({
        where : {
            course_employee_id : courseEmployeeId,
            exam_id : examId
        }
    });
}

export const repoEnrollExam = async(data) => {
    return await ExamsEmployee.create(data)
};

export const repoExamAnswerQuestion = async(data) => {
    await ExamsEmployeeAnswer.create(data);
}

export const repoGetExamEmployeeAnswer = async(examEmployeeId, examQuestionId) => {
    return await ExamsEmployeeAnswer.findOne({
        where : {
            exam_employee_id : examEmployeeId,
            exam_question_id : examQuestionId
        }
    });
}

export const repoDeleteExamEmployeeAnswer = async(id) => {
    await ExamsEmployeeAnswer.destroy({
        where : {
            id : id
        }
    });
}

export const repoSumPointByExamEmployee = async(examEmployeeId) => {
    return await ExamsEmployeeAnswer.findOne({
        attributes : [[ Sequelize.fn('sum', Sequelize.col('point')),'total']],
        where : {
            exam_employee_id : examEmployeeId
        },
        raw : true
    });
}

export const repoUpdateExamEmployee = async(data, id) => {
    await ExamsEmployee.update(data, {
        where : {
            id : id
        }
    });
}

export const repoGetMyExams = async(employeeId) => {
    return await Exams.findAll({
        attributes : [
            'id',
            'title',
            'description',
            'exam_time',
            'number_of_question',
            'passing_grade',
        ],
        include : {
            model : Courses,
            foreignKey : 'course_id',
            attributes : [
                'id',
                'course_name',
                [Sequelize.literal(`( SELECT b.status FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'status_exams']
            ],
            include : {
                model : Organization,
                foreignKey : 'organization_code',
                attributes : ['organization_code','organization_name']
            },
            where :{
                id :{
                    [Op.in] : Sequelize.literal(`(SELECT course_id FROM courses_employee WHERE employee_id='${employeeId}')`)
                }
            }
        }
    });
}

export const repoGetExamEmpByEmployee = async(courseId, employeeId) => {
    return await Exams.findAll({
        attributes : ['id','title',[Sequelize.literal(`'exam'`),'learning_type']],
        include : {
            model : Courses,
            foreignKey : 'course_id',
            attributes : [
                'course_name',
                [Sequelize.literal(`(SELECT b.status FROM courses_employee a, exams_employee b WHERE a.id=b.course_employee_id AND a.course_id=course.id AND a.employee_id='${employeeId} ')`),'status_exam'],
                [Sequelize.literal(`(SELECT id FROM courses_employee WHERE course_id=course.id AND employee_id='${employeeId}')`),'course_employee_id']
            ],
        },
        where : {
            course_id : courseId,
            id : {
                [Op.in] : Sequelize.literal(`(SELECT a.id FROM exams a, courses_employee b WHERE a.course_id=b.course_id AND b.course_id=course.id AND b.employee_id='${employeeId}')`)
            }
        }
    })
}

export const repoGetMyExamEmpByExam = async(examId, employeeId) => {
    return await Exams.findOne({
        attributes : [
            'id',
            'title',
            'description',
            'exam_time',
            'number_of_question',
            'passing_grade',
        ],
        include : {
            model : Courses,
            foreignKey : 'course_id',
            attributes : [
                'id',
                'course_name',
                [Sequelize.literal(`( SELECT b.status FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'status_exams'],
                [Sequelize.literal(`( SELECT b.score FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'score'],
                [Sequelize.literal(`( SELECT b.passed_status FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'passed_status'],
                [Sequelize.literal(`( SELECT b.status FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'status_exams'],
                [Sequelize.literal(`( SELECT b.id FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'exam_employee_id'],
                [Sequelize.literal(`( SELECT b.max_time FROM courses_employee a JOIN exams_employee b WHERE a.id=b.course_employee_id AND a.employee_id='${employeeId}' AND course_id=course.id)`),'max_time']
            ]
        },
        where :{
            id : {
                [Op.in] : Sequelize.literal(`(SELECT a.id FROM exams a, courses_employee b WHERE a.id='${examId}' AND a.course_id=b.course_id AND b.course_id=course.id AND b.employee_id='${employeeId}')`)
            }
        }
    });
}

export const repoGetQuestionByExamEmp= async(examEmployeeId, questionNumber, result) => {
    var attributes;
    if(result == false) {
        attributes = [
            'id',
            'name_of_question',
            'question_number',
            'question_type',
            [Sequelize.literal('(SELECT answer_of_question FROM exams_employee_answer WHERE exam_question_id=`exam->exams_questions`.`id` AND exam_employee_id='+examEmployeeId+')'),'answer_of_question']
        ]
    }else{
        attributes = [
            'id',
            'name_of_question',
            'question_number',
            'question_type',
            ['answer_of_question','correct_answer'],
            [Sequelize.literal('(SELECT answer_of_question FROM exams_employee_answer WHERE exam_question_id=`exam->exams_questions`.`id` AND exam_employee_id='+examEmployeeId+')'),'answer_of_question'],
            [Sequelize.literal('(SELECT is_correct FROM exams_employee_answer WHERE exam_question_id=`exam->exams_questions`.`id` AND exam_employee_id='+examEmployeeId+')'),'is_correct']
        ]
    }
    return await ExamsEmployee.findOne({
        where : {
            id : examEmployeeId
        },
        include : [
            {
                model : Exams,
                foreignKey : 'exam_id',
                include : {
                    model : ExamsQuestions,
                    foreignKey : 'exam_id',
                    attributes : attributes,
                    where : {
                        question_number : questionNumber
                    },
                    include : {
                        model : ExamsMultipleChoice,
                        foreignKey : 'exam_question_id',
                        attributes : ['choice_name','choice_type']
                    }
                }
            },
        ]
    })
}

export const repoGetResultExam = async() => {
    return await ExamsEmployee.findAll({
        include : [
            {
                model : CoursesEmployee,
                foreignKey : 'course_employee_id',
                attributes : ['id', 'progress', 'status'],
                include : {
                    model : Courses,
                    foreignKey : 'course_id',
                    attributes : ['id','course_name','organization_code']
                }  
            },
            {
                model : Exams,
                foreignKey : 'exam_id',
                attributes : ['id','title','exam_time','number_of_question','passing_grade']
            }
        ]
    });
}

export const repoGetResultExamByEmployee = async(employeeId) => {
    return await ExamsEmployee.findAll({
        include : [
            {
                model : CoursesEmployee,
                foreignKey : 'course_employee_id',
                attributes : ['id', 'progress', 'status'],
                where : {
                    employee_id : employeeId
                },
                include : {
                    model : Courses,
                    foreignKey : 'course_id',
                    attributes : ['id','course_name','organization_code']
                }  
            },
            {
                model : Exams,
                foreignKey : 'exam_id',
                attributes : ['id','title','exam_time','number_of_question','passing_grade']
            }
         ]
    });
}

export const repoGetResultExamByOrg = async(organizationCode) => {
    return await ExamsEmployee.findAll({
        include : [
            {
                model : CoursesEmployee,
                foreignKey : 'course_employee_id',
                attributes : ['id', 'progress', 'status'],
                where : {
                    employee_id : {
                        [Op.in] : Sequelize.literal(`(SELECT id FROM users WHERE organization_code='${organizationCode}')`)
                    }
                },
                include : {
                    model : Courses,
                    foreignKey : 'course_id',
                    attributes : ['id','course_name','organization_code']
                }  
            },
            {
                model : Exams,
                foreignKey : 'exam_id',
                attributes : ['id','title','exam_time','number_of_question','passing_grade']
            }
         ]
    });
}