import Courses from "../db/models/Courses.js";
import { Lessons, LessonsDetail, LessonsEmployee } from "../db/models/relationship/LessonRelation.js";
import Organization from "../db/models/Organization.js";
import Sequelize, { Op } from "sequelize";
import CoursesEmployee from "../db/models/CoursesEmployee.js";

const includeModelsLesson = [
    {
        model : LessonsDetail,
        foreignKey : 'lesson_id',
        attributes : ['id','lesson_detail_title'],
    },
    {
        model : Courses,
        foreignKey : 'course_id',
        attributes : ['id', 'course_name'],
        include : {
            model : Organization,
            foreignKey : 'organization_code',
            attributes : ['organization_code', 'organization_name']
        }
    }
];

const includeModelsLessonContent = {
    model : Lessons,
    foreignKey : 'lesson_id',
    attributes : ['id', 'lesson_title','course_id','created_by']
}

export const repoCreateLesson = async(data) => {
    return await Lessons.create(data);
}

export const repoUpdateLesson = async(data, id) => {
    await Lessons.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteLesson = async(id) => {
    await Lessons.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetLesson = async() => {
    return await Lessons.findAll({
        include : includeModelsLesson
    });
}

export const repoGetLessonByCourse = async(course) => {
    return await Lessons.findAll({
        where : {
            course_id : course   
        },
        include : includeModelsLesson
    });
}

export const repoGetLessonById = async(id) => {
    return await Lessons.findByPk(id, {
        include : includeModelsLesson
    });
}

export const repoGetLessonContentByLesson = async(lesson) => {
    return await LessonsDetail.findAll({
        where : {
            lesson_id : lesson
        },
        include : includeModelsLessonContent
    });
}

export const repoCreateLessonContent = async(data) => {
    await LessonsDetail.create(data);
}

export const repoUpdateLessonContent = async(data, id) => {
    await LessonsDetail.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteLessonContent = async(id) => {
    await LessonsDetail.destroy({
        where : {
            id : id
        }
    });
}

export const repoCompletedSubLesson = async(data) => {
    await LessonsEmployee.create(data);
}

export const repoGetLessonsEmpByIdAndLesson = async(id, lesson) => {
    return await LessonsEmployee.findOne({
        where : {
            course_employee_id : id,
            lesson_detail_id : lesson
        }
    });
}

export const repoGetLessonContentById = async(id) => {
    return await LessonsDetail.findOne({
        where : {
            id : id
        },
         include : includeModelsLessonContent
    });
}

export const repoGetLessonEmpByCourseEmp = async(courseEmployeeId) => {
    return await LessonsEmployee.findAll({
        where : {
            course_employee_id : courseEmployeeId
        }
    });
}

export const repoGetFirstLesson = async(courseId) => {
    return await LessonsDetail.min('lessons_detail.id', {
        include : {
            model : Lessons,
            foreignKey : 'lesson_id',
            attributes : ['lesson_title'],
            where : {
                course_id : courseId
            }
        }
    });
}

export const repoGetLastLesson = async(courseId) => {
    return await LessonsDetail.max('lessons_detail.id', {
        include : {
            model : Lessons,
            foreignKey : 'lesson_id',
            attributes : ['lesson_title'],
            where : {
                course_id : courseId
            }
        }
    });
}

export const repoGetLessonByCourseEmp = async(courseId, employeeId) => {
    return await Lessons.findAll({
        attributes : ['id', 'course_id', 'lesson_title',[Sequelize.literal(`'lesson'`), 'learning_type']],
        include : [
            {
                model : LessonsDetail,
                foreignKey : 'lesson_id',
                attributes : ['id','lesson_detail_title'],
                include : {
                    model : LessonsEmployee,
                    foreignKey : 'lesson_detail_id',
                    attributes : ['course_employee_id','status'],
                },
                where : {
                    id : {
                        [Op.in] : Sequelize.literal(`(SELECT b.id FROM lessons a, lessons_detail b, courses_employee c WHERE a.id=b.lesson_id AND a.course_id=c.course_id AND c.course_id='${courseId}' AND c.employee_id='${employeeId}')`)
                    }
                }
            },
            {
                model : Courses,
                foreignKey : 'course_id',
                attributes : [
                    'course_name',
                    [Sequelize.literal(`(SELECT b.status FROM courses_employee a, lessons_employee b WHERE course.id=a.course_id AND a.employee_id='${employeeId}' AND a.id=b.course_employee_id AND lesson_detail_id=lessons_details.id)`), 'status_lesson'],
                    [Sequelize.literal(`(SELECT id FROM courses_employee a WHERE a.employee_id='${employeeId}' AND a.course_id=course.id)`),'course_employee_id']
                ],
                where : {
                    id : courseId
                }
            }
        ]
    })
}