import Users from "../db/models/Users.js";
import Roles from "../db/models/Roles.js";
import Organization from "../db/models/Organization.js";
import Position from "../db/models/Position.js";
import { Menu, Modul, RolesManagement } from "../db/models/relationship/RoleManagement.js";
import { Op, Sequelize } from "sequelize";

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

export const repoGetRole = async(roles) => {

    // const tempSQL = RolesManagement.findAll({
    //     attributes : ['flag_id'],
    //     where : {
    //         roles : roles
    //     }
    // })

    return await RolesManagement.findAll({
        where : {
            roles : roles,
            type : 'Modul',
        },
        include : [
            {
                model : Roles,
                foreignKey : 'roles',
                attributes : ['roles','roles_description']
            },
            {
                model : Modul,
                foreignKey : 'flag_id',
                attributes : ['id', 'modul_name','modul_url','modul_icon','is_parent'],
                include : {
                    model : Menu,
                    foreignKey : 'modul_id',
                    attributes : ['id','menu_name','menu_url','menu_icon'],
                    include : {
                        model : RolesManagement,
                        foreignKey : 'flag_id',
                        where : {
                            type : 'Menu',
                            roles : roles
                        },
                        attributes : ['permission']
                    }
                }
            }
        ]
    });
}

export const repoGetOrganization = async() => {
    return await Organization.findAll();
}

export const repoGetOrganizationByCode = async(code) => {
    return await Organization.findOne({
        where : {
            organization_code : code
        }
    });
}

export const repoUpdateOrganization = async(data, code) => {
    await Organization.update(data, {
        where : {
            organization_code : code
        }
    });
}

export const repoDeleteOrganization = async(code) => {
    await Organization.destroy({
        where : {
            organization_code : code
        }
    })
}

export const repoCreateOrganization = async(data) => {
    await Organization.create(data);
}

export const repoGetListRole = async(data) => {
    return await Roles.findAll();
}

export const repoGetPosition = async() => {
    return await Position.findAll();
}

export const repoGetPositionByCode = async(code) => {
    return await Position.findOne({
        where : {
            position_code : code
        }
    });
}

export const repoUpdatePosition = async(data, code) => {
    await Position.update(data, {
        where : {
            position_code : code
        }
    });
}

export const repoCreatePosition = async(data) => {
    await Position.create(data);
}

export const repoDeletePosition = async(code) => {
    await Position.destroy({
        where : {
            position_code : code
        }
    });
}

export const repoGetUserByOrg = async(org) => {
    return await Users.findAll({
        where : {
            organization_code : org
        },
        include : includeModels,
        attributes : attributes
    });
}

export const repoGetPermission = async(role, type, url) => {
    let included;
    if(type == 'Modul'){
        included = {
            model : Modul,
            foreignKey : 'flag_id',
            where : {
                modul_url : url
            },
            attributes : ['modul_url']
        }
    }else{
        included = {
            model : Menu,
            foreignKey : 'flag_id',
            where : {
                menu_url : url
            },
            attributes : ['menu_url']
        }
    }
    return await RolesManagement.findOne({
        where : {
            roles: role,
            type : type
        },
        include :   included,
        attributes : ['permission']
    });
}