import Courses from "../db/models/Courses.js";
import { Lessons, LessonsDetail } from "../db/models/relationship/LessonRelation.js";
import Organization from "../db/models/Organization.js";

const includeModelsLesson = [
    {
        model : LessonsDetail,
        foreignKey : 'lesson_id',
        attributes : ['lesson_content']
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
    attributes : ['id', 'lesson_title','created_by']
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