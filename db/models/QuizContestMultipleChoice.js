import db from "../../config/database.js";
import { Sequelize } from "sequelize";

const QuizContestMultipeChoice = db.define('quiz_contest_multiple_choice', {
    contest_question_id : {
        type : Sequelize.INTEGER
      },
    choice_name : {
        type : Sequelize.STRING
    },
    choice_type : {
        allowNull : false,
        type : Sequelize.ENUM('A','B','C','D','E')
    },
}, {
    freezeTableName : true
});

export default QuizContestMultipeChoice;