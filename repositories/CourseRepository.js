import Courses from "../db/models/Courses.js";
import Organization from "../db/models/Organization.js";
import Users from "../db/models/Users.js";

const attributes = ['id','course_name','organization_code','due_date','createdAt','updatedAt'];
const includeModels = [
    {
        model : Users,
        foreignKey : 'created_by',
        attributes : ['id','name'],
    },
    {
        model : Organization,
        foreignKey :'organization_code',
        attributes : ['organization_code', 'organization_name']
    },
];

export const repoCourseByID = async(id) => {
    const course = await Courses.findOne({
        where : {
            id : id
        }, 
        include : includeModels,
        attributes : attributes
    });
    return course;
}

export const repoUpdateCourse = async(data, id) => {
    await Courses.update(data, {
        where : {
            id : id
        }
    });
}

export const repoDeleteCourse = async(id) => {
    await Courses.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetCourse = async() => {
    const course = await Courses.findAll({
        include : includeModels,
        attributes : attributes
    });
    return course;
}

export const repoGetCourseByOrg = async(org) => {
    const course = await Courses.findOne({
        where : {
            organization_code : org
        },
        include : includeModels,
        attributes : attributes
    });
    return course;
}

export const repoCreateCourse = async(data) => {
    await Courses.create(data);
}