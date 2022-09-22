import Sequelize, { Op, where } from "sequelize";
import Courses from "../db/models/Courses.js";
import CoursesEmployee from "../db/models/CoursesEmployee.js";
import Organization from "../db/models/Organization.js";
import Users from "../db/models/Users.js";

const attributes = ['id','course_name','organization_code','description','due_date','createdAt','updatedAt'];
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

const includeModelsEmp = [
    {
        model : Courses,
        foreignKey : 'course_id',
        attributes : ['id','course_name']
    },
    {
        model : Users,
        foreignKey : 'employee_id',
        attributes : ['id', 'name']
    }
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
    const course = await Courses.findAll({
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

export const repoEnrollCourse = async(data) => {
    await Courses.create(data);
}

export const repoCheckCourseEmployee = async(course_id, employee_id) => {
    return await CoursesEmployee.findOne({
        where : {
            course_id : course_id,
            employee_id : employee_id
        }
    });
}

export const repoCreateCourseEmployee = async(data) => {
    await CoursesEmployee.create(data);
}

export const unEnrollCourse = async(id) => {
    // await CoursesEmployee.destroy({
        
    // })
}

export const repoGetCourseEmpById = async(id) => {
    return await CoursesEmployee.findOne({
        where : {
            id : id
        },
        include : includeModelsEmp
    });
}

export const repoGetCourseEmp = async() => {
    return await CoursesEmployee.findAll({
        include : includeModelsEmp
    });
}

export const repoUpdateCourseEmployee = async(data, id) => {
    await CoursesEmployee.update(data, {
        where : {
            id : id
        },
        individualHooks : true
    });
}

export const repoGetCourseByEmployee = async(employeeId) => {
    return await CoursesEmployee.findAll({
        where : {
            employee_id : employeeId
        },
        include : {
            model : Courses,
            foreignKey : 'course_id',
            attributes : ['course_name','description','due_date'],
            include : {
                model : Organization,
                foreignKey : 'organization_code',
                attributes : ['organization_name']
            }
        }
    })
}

export const repoGetMyCourses = async(employeeId) => {
    return await CoursesEmployee.findAll({
        attributes : ['id','employee_id','progress','status'],
        include :{
            model : Courses,
            attributes : attributes,
            foreignKey : 'course_id',
            include : [
                {
                    model : Organization,
                    foreignKey : 'organization_code',
                    attributes : ['organization_code','organization_name']
                },
                {
                    model : Users,
                    foreignKey : 'created_by',
                    attributes : ['name']
                }
            ]
        },
        where : {
            employee_id : employeeId
        }
    })
}