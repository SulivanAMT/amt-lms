import { QueryTypes } from "sequelize"
import db from "../config/database.js"
import { Menu, Modul, RolesManagement } from "../db/models/relationship/RoleManagement.js"

export const repoGetPermission = async() => {
    return await db.query(`SELECT 
            A.id,
            C.roles,
            C.roles_description AS role_name,
            B.modul_name AS name,
            B.modul_url AS url,
            A.type,
            A.permission,
            A.createdAt,
            A.updatedAt
        FROM
            roles_management A,
            modul B,
            roles C
        WHERE
            A.flag_id = B.id AND A.roles = C.roles
                AND type = 'Modul' 
        UNION ALL SELECT 
            A.id,
            C.roles,
            C.roles_description AS role_name,
            B.menu_name AS name,
            B.menu_url AS url,
            A.type,
            A.permission,
            A.createdAt,
            A.updatedAt
        FROM
            roles_management A,
            menu B,
            roles C
        WHERE
            A.flag_id = B.id AND A.roles = C.roles
                AND type = 'Menu'`, {
        type : QueryTypes.SELECT
    });
}

export const repoGetPermissionById = async(id) => {
    return await db.query(`SELECT 
            A.id,
            C.roles,
            C.roles_description AS role_name,
            B.modul_name AS name,
            B.modul_url AS url,
            A.type,
            A.permission,
            A.createdAt,
            A.updatedAt
        FROM
            roles_management A,
            modul B,
            roles C
        WHERE
            A.flag_id = B.id AND A.roles = C.roles
                AND A.type = 'Modul' 
                AND A.id = '${id}' 
        UNION ALL SELECT 
            A.id,
            C.roles,
            C.roles_description AS role_name,
            B.menu_name AS name,
            B.menu_url AS url,
            A.type,
            A.permission,
            A.createdAt,
            A.updatedAt
        FROM
            roles_management A,
            menu B,
            roles C
        WHERE
            A.flag_id = B.id AND A.roles = C.roles
                AND A.type = 'Menu'
                AND A.id = '${id}' `, {
        type : QueryTypes.SELECT
    });
}

export const repoCreatePermission = async(data) => {
    await RolesManagement.create(data);
}

export const repoDeletePermission = async(id) => {
    await RolesManagement.destroy({
        where : {
            id : id
        }
    });
}

export const repoUpdatePermission = async(data, id) => {
    await RolesManagement.update(data, {
        where : {
            id : id
        }
    });
}

export const repoCheckPermission = async(roles, id, type) => {
    return await RolesManagement.findAll({
        where : {
            roles : roles,
            flag_id : id,
            type : type
        }
    });
}

export const repoGetModul = async() => {
    return await Modul.findAll();
}

export const repoGetMenu = async() => {
    return await Menu.findAll();
}