import Courses from './Courses.js';

import db from '../../config/database.js';
import Sequelize from 'sequelize';

const Quiz = db.define('quiz', {
    title : {
        type : Sequelize.STRING
    },
    course_id : {
        type : Sequelize.INTEGER
    },
    quiz_time : {
        type : Sequelize.INTEGER
    },
    number_of_question : {
        type : Sequelize.INTEGER
    },
    created_by : {
        type : Sequelize.STRING
    },
}, {
    freezeTableName : true
});

Quiz.belongsTo(Courses, {
    foreignKey : 'course_id'
});

export default Quiz;