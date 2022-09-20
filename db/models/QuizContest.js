import db from '../../config/database.js';
import { Sequelize } from 'sequelize';

const QuizContest = db.define('quiz_contest', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.STRING
    },
    quiz_time : {
        type : Sequelize.INTEGER
    },
    description : {
        type : Sequelize.STRING
    },
    due_date : {
        type : Sequelize.DATEONLY
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
}, {
    freezeTableName : true
});

export default QuizContest;