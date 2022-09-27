import db from "../../config/database.js";
import Sequelize from "sequelize";
import Users from "./Users.js";
import QuizContest from "./QuizContest.js";
import QuizContestPrize from "./QuizContestPrize.js";

const QuizContestWinner = db.define('quiz_contest_winner', {
    prize_id : {
        type : Sequelize.INTEGER
    },
    employee_id : {
        type : Sequelize.INTEGER
    },
}, {
    freezeTableName : true
});

QuizContestWinner.belongsTo(Users, {
    foreignKey : 'employee_id'
});


export default QuizContestWinner;