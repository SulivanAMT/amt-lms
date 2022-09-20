import db from "../../config/database.js";
import Sequelize from "sequelize";
import QuizContestWinner from "./QuizContestWinner.js";

const QuizContestPrize = db.define('quiz_contest_prize', {
    quiz_contest_id : {
        type : Sequelize.INTEGER
    },
    winner_type : {
        type : Sequelize.ENUM('Juara 1', 'Juara 2', 'Juara 3', 'Juara Favorit')
    },
    prize_description : {
        type : Sequelize.STRING
    },
}, {
    freezeTableName : true
});

QuizContestPrize.hasOne(QuizContestWinner, {
    foreignKey : 'prize_id'
});

export default QuizContestPrize;