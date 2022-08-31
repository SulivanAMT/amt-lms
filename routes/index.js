import { login, logout } from '../controller/AuthController.js';
import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { validateDataUser, validateUser } from '../validator/Users.js';
import { getUser, getUserById, updateUser, deleteUser, addUser } from '../controller/UserController.js';
import { addCourse, updateCourse, deleteCourse, getCourse, getCourseByOrg, getCourseById } from '../controller/CourseController.js';
import { validateCourse, validateDataCourse } from '../validator/Courses.js';
import { addLesson, createLessonContent, deleteLesson, deleteLessonContent, getLesson, getLessonByCourse, getLessonById, getLessonContentByLesson, updateLesson, updateLessonContent } from '../controller/LessonController.js';
import { validateDataLesson, validateLesson } from '../validator/Lessons.js';
import { validateDataLessonDetail, validateLessonDetail } from '../validator/LessonDetail.js';
import { createExam, createExamQuestion, deleteExam, deleteExamQuestion, getExam, getExamByCourse, getExamById, getQuestionByExam, updateExam, updateExamQuestion } from '../controller/ExamController.js';
import { validateExam } from '../validator/Exam.js';
import { createQuiz, createQuizQuestion, deleteQuiz, deleteQuizQuestion, getQuestionByQuiz, getQuiz, getQuizByCourse, getQuizById, updateQuiz, updateQuizQuestion } from '../controller/QuizController.js';
import { validateQuiz } from '../validator/Quiz.js';

const router = express.Router();

/* Authentication Routes */
router.post('/auth/login', login);
router.post('/auth/logout', logout);


/* User Routes */
router.get('/user', verifyToken, getUser);
router.get('/user/:id', verifyToken, validateDataUser, getUserById);
router.put('/user/:id', verifyToken, validateUser, validateDataUser, updateUser);
router.post('/user', verifyToken, validateUser, validateDataUser, addUser);
router.delete('/user/:id', verifyToken, validateDataUser, deleteUser);

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

//Lesson Content
router.get('/lesson_detail/:lesson', verifyToken, getLessonContentByLesson);
router.post('/lesson_detail', verifyToken, validateLessonDetail, validateDataLessonDetail, createLessonContent);
router.put('/lesson_detail/:id', verifyToken, validateLessonDetail, validateDataLessonDetail, updateLessonContent);
router.delete('/lesson_detail/:id', verifyToken, validateDataLessonDetail, deleteLessonContent);

//Exams
router.get('/exam', verifyToken, getExam);
router.get('/exam/:id', verifyToken, getExamById);
router.put('/exam/:id', verifyToken, validateExam, updateExam);
router.post('/exam', verifyToken, validateExam, createExam);
router.delete('/exam/:id', verifyToken, deleteExam);
router.post('/exam/course', verifyToken, validateExam, getExamByCourse);

//Exams Question
router.put('/exam_question/:id', verifyToken, updateExamQuestion);
router.post('/exam_question', verifyToken, createExamQuestion);
router.put('/exam_question/:id', verifyToken, updateExamQuestion);
router.delete('/exam_question/:id', verifyToken, deleteExamQuestion);
router.post('/exam_question/exam', verifyToken, getQuestionByExam);

//Quiz
router.get('/quiz', verifyToken, getQuiz);
router.get('/quiz/:id', verifyToken, getQuizById);
router.put('/quiz/:id', verifyToken, validateQuiz, updateQuiz);
router.post('/quiz', verifyToken, validateQuiz, createQuiz);
router.delete('/quiz/:id', verifyToken, deleteQuiz);
router.post('/quiz/course', verifyToken, validateQuiz, getQuizByCourse);

//Quiz Question
router.put('/quiz_question/:id', verifyToken, updateQuizQuestion);
router.post('/quiz_question', verifyToken, createQuizQuestion);
router.put('/quiz_question/:id', verifyToken, updateQuizQuestion);
router.delete('/quiz_question/:id', verifyToken, deleteQuizQuestion);
router.post('/quiz_question/quiz', verifyToken, getQuestionByQuiz);

/* Learning, Exam & Contest */

/* Monitoring & Reporting */

/* Settings */

export default router;