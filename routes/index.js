import { login, logout, refreshToken } from '../controller/AuthController.js';
import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { validateDataUser, validateUser } from '../validator/Users.js';
import { getUser, getUserById, updateUser, deleteUser, addUser, getListOfMenu, getOrganization, createOrganization, updateOrganization, deleteOrganization, getOrganizationByCode, getRoles, getPosition, updatePosition, deletePosition, createPosition, getPositionByCode, getUserByOrg, getPermissionByMenu } from '../controller/UserController.js';
import { addCourse, updateCourse, deleteCourse, getCourse, getCourseByOrg, getCourseById } from '../controller/CourseController.js';
import { validateCourse, validateDataCourse } from '../validator/Courses.js';
import { addLesson, createLessonContent, deleteLesson, deleteLessonContent, getLesson, getLessonByCourse, getLessonById, getLessonContentById, getLessonContentByLesson, updateLesson, updateLessonContent, uploadImageLesson, deleteImageLesson, getImageContent } from '../controller/LessonController.js';
import { validateDataLesson, validateLesson } from '../validator/Lessons.js';
import { validateDataLessonDetail, validateLessonDetail } from '../validator/LessonDetail.js';
import { createExam, createExamQuestion, deleteExam, deleteExamQuestion, getExam, getExamByCourse, getExamById, getQuestionByExam, updateExam, updateExamQuestion } from '../controller/ExamController.js';
import { validateExam } from '../validator/Exam.js';
import { createQuiz, createQuizQuestion, deleteQuiz, deleteQuizQuestion, getQuestionByQuiz, getQuiz, getQuizByCourse, getQuizById, updateQuiz, updateQuizQuestion } from '../controller/QuizController.js';
import { validateQuiz } from '../validator/Quiz.js';
import { RoutingLearning } from '../middleware/RoutingLearning.js';
import { validateDataOrganization, validateOrganization } from '../validator/Organization.js';
import { validatePosition } from '../validator/Position.js';
import multer from 'multer';
import validateExamQuestion from '../validator/ExamQuestion.js';
import validateQuizQuestion from '../validator/QuizQuestion.js';
import { createQuizContest, createQuizContestQuestion, deleteQuizContest, deleteQuizContestQuestion, getPrizeByQuizContest, getQuestionByQuizContest, getQuizContest, getQuizContestById, setTheWinnerQuizContest, updateQuizContest, updateQuizContestQuestion } from '../controller/QuizContestController.js';
import validateQuizContest from '../validator/QuizContest.js';
import validateQuizContestQuestion from '../validator/QuizContestQuestion.js';

const router = express.Router();

/* Authentication Routes */
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/refresh_token', refreshToken)


/* User Routes */
router.get('/user', verifyToken, getUser);
router.get('/user/:id', verifyToken, validateDataUser, getUserById);
router.put('/user/:id', verifyToken, validateUser, validateDataUser, updateUser);
router.post('/user', verifyToken, validateUser, validateDataUser, addUser);
router.delete('/user/:id', verifyToken, validateDataUser, deleteUser);
router.post('/user/org', verifyToken, getUserByOrg);

/* Roles */
router.post('/roles', verifyToken, getListOfMenu);
router.get('/roles', verifyToken, getRoles);
router.post('/roles/permission', verifyToken, getPermissionByMenu)

/* Organization  */
router.get('/organization', verifyToken, getOrganization);
router.get('/organization/:code', verifyToken, getOrganizationByCode);
router.post('/organization', verifyToken, validateOrganization, validateDataOrganization, createOrganization);
router.put('/organization/:code', verifyToken, validateOrganization, validateDataOrganization, updateOrganization);
router.delete('/organization/:code', verifyToken, validateDataOrganization, deleteOrganization);

/* Position */
router.get('/position', verifyToken, getPosition);
router.get('/position/:code', getPositionByCode);
router.put('/position/:code', verifyToken, validatePosition, updatePosition);
router.delete('/position/:code', verifyToken, deletePosition);
router.post('/position', verifyToken, validatePosition, createPosition);

/* Content Management */

//Course
router.get('/course', verifyToken, getCourse);
router.get('/course/:id', verifyToken, validateDataCourse, getCourseById);
router.put('/course/:id', verifyToken, validateCourse, validateDataCourse, updateCourse);
router.post('/course', verifyToken, validateCourse, validateDataCourse, addCourse);
router.delete('/course/:id', verifyToken, validateDataCourse, deleteCourse);
router.post('/course/org', verifyToken, validateDataCourse, getCourseByOrg);

//Lesson
router.get('/lesson', verifyToken, getLesson);
router.get('/lesson/:id', verifyToken, validateDataLesson, getLessonById);
router.put('/lesson/:id', verifyToken, validateLesson, validateDataLesson, updateLesson);
router.post('/lesson', verifyToken, validateLesson, validateDataLesson, addLesson);
router.delete('/lesson/:id', verifyToken, validateDataLesson, deleteLesson);
router.post('/lesson/course', verifyToken, validateDataLesson, getLessonByCourse);
router.post('/lesson/upload_image', verifyToken, uploadImageLesson);
router.get('/lesson/delete_image/:imageName', verifyToken, deleteImageLesson);
router.get('/lesson/image/:imageName', getImageContent);

//Lesson Content
router.post('/lesson_detail/lesson', verifyToken, getLessonContentByLesson);
router.post('/lesson_detail', verifyToken, validateLessonDetail, validateDataLessonDetail, createLessonContent);
router.put('/lesson_detail/:id', verifyToken, validateLessonDetail, validateDataLessonDetail, updateLessonContent);
router.delete('/lesson_detail/:id', verifyToken, validateDataLessonDetail, deleteLessonContent);
router.get('/lesson_detail/:id', verifyToken, getLessonContentById);

//Exams
router.get('/exam', verifyToken, getExam);
router.get('/exam/:id', verifyToken, getExamById);
router.put('/exam/:id', verifyToken, validateExam, updateExam);
router.post('/exam', verifyToken, validateExam, createExam);
router.delete('/exam/:id', verifyToken, deleteExam);
router.post('/exam/course', verifyToken, getExamByCourse);

//Exams Question
router.post('/exam_question', verifyToken, validateExamQuestion, createExamQuestion);
router.put('/exam_question/:id', verifyToken, validateExamQuestion, updateExamQuestion);
router.delete('/exam_question/:id', verifyToken, deleteExamQuestion);
router.post('/exam_question/exam', verifyToken, getQuestionByExam);

//Quiz
router.get('/quiz', verifyToken, getQuiz);
router.get('/quiz/:id', verifyToken, getQuizById);
router.put('/quiz/:id', verifyToken, validateQuiz, updateQuiz);
router.post('/quiz', verifyToken, validateQuiz, createQuiz);
router.delete('/quiz/:id', verifyToken, deleteQuiz);
router.post('/quiz/course', verifyToken, getQuizByCourse);

//Quiz Question
router.put('/quiz_question/:id', verifyToken, validateQuizQuestion, updateQuizQuestion);
router.post('/quiz_question', verifyToken, validateQuizQuestion, createQuizQuestion);
router.delete('/quiz_question/:id', verifyToken, deleteQuizQuestion);
router.post('/quiz_question/quiz', verifyToken, getQuestionByQuiz);

//Quiz Contest
router.get('/quiz_contest', verifyToken, getQuizContest);
router.post('/quiz_contest', verifyToken, validateQuizContest, createQuizContest);
router.get('/quiz_contest/:id', verifyToken, getQuizContestById);
router.put('/quiz_contest/:id', verifyToken, validateQuizContest, updateQuizContest);
router.delete('/quiz_contest/:id', verifyToken, deleteQuizContest);

//Quiz Contest Question
router.post('/quiz_contest/question', verifyToken, validateQuizContestQuestion, createQuizContestQuestion);
router.put('/quiz_contest/question/:id', verifyToken, validateQuizContestQuestion, updateQuizContestQuestion);
router.post('/quiz_contest/question/quiz', verifyToken, getQuestionByQuizContest);
router.delete('/quiz_contest/question/:id', verifyToken, deleteQuizContestQuestion);
router.get('/quiz_contest/prize/:id', verifyToken, getPrizeByQuizContest);
router.post('/quiz_contest/winner', verifyToken, setTheWinnerQuizContest);

/* Learning, Exam & Contest */
router.post('/learning', verifyToken, RoutingLearning)

/* Monitoring & Reporting */

/* Settings */


export default router;