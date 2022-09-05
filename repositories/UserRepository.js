import Users from "../db/models/Users.js";
import Roles from "../db/models/Roles.js";
import Organization from "../db/models/Organization.js";
import Position from "../db/models/Position.js";

const attributes = ['id', 'name','email','phone_number','status','createdAt','updatedAt'];
const includeModels = [
    {
        model : Roles,
        foreignKey : 'roles',
        attributes : ['roles', 'roles_description']
    },
    {
        model : Organization,
        foreignKey :'organization_code',
        attributes : ['organization_code', 'organization_name']
    },
    {
        model : Position,
        foreignKey :'position_code',
        attributes : ['position_code', 'position_name']
    }
];

export const repoUserById = async(id) => {
    const users = await Users.findOne({
        where : {
            id : id
        },
        include : includeModels,
        attributes : attributes
    });

    return users;
}

export const repoCreateUser = async(data) => {
    await Users.create(data);
}

export const repoGetUser = async() => {
    const users = await Users.findAll({
        include : includeModels,
        attributes : attributes
    });
    return users
}

export const repoUpdateUser = async(data, id) => {
    await Users.update(data, {
        where : {
            id : id
        }
    })
}

export const repoDeleteUser = async(id) => {
    await Users.destroy({
        where : {
            id : id
        }
    });
}

export const repoGetByEmail = async(email) => {
    const user = await Users.findOne({
        where : {
            email : email
        }
    });
    return user;
}

export const repoGetByToken = async(token) => {
    const user = await Users.findOne({
        where : {
            refresh_token : token
        }
    });
    return user;
}