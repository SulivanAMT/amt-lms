import db from "../../config/database.js";
import Sequelize from "sequelize";
import QuizContest from "./QuizContest.js";
import Users from "./Users.js";

const QuizContestEmployee = db.define('quiz_contest_employee', {
    employee_id : {
        allowNull : false,
        type : Sequelize.INTEGER
    },
    quiz_contest_id : {
        allowNull : false,
        type : Sequelize.INTEGER
    },
    score : {
        allowNull : false,
        type : Sequelize.FLOAT
    },
    start_at : {
        allowNull : false,
        type : Sequelize.DATE
    },
    end_at: {
        type : Sequelize.DATE
    },
    max_time : {
        allowNull : false,
        type : Sequelize.DATE
    },
    status : {
        allowNull : false,
        type : Sequelize.ENUM('Done', 'In Progress')
    },
}, {
    freezeTableName : true
});

QuizContestEmployee.belongsTo(QuizContest, {
    foreignKey : 'quiz_contest_id'
});

QuizContestEmployee.belongsTo(Users, {
    foreignKey : 'employee_id'
});

export default QuizContestEmployee;