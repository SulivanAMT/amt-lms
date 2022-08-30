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
router.get('/exam', verifyToken, getLesson);
router.get('/exam/:id', verifyToken, validateDataLesson, getLessonById);
router.put('/exam/:id', verifyToken, validateLesson, validateDataLesson, updateLesson);
router.post('/exam', verifyToken, validateLesson, validateDataLesson, addLesson);
router.delete('/exam/:id', verifyToken, validateDataLesson, deleteLesson);
router.post('/exam/course', verifyToken, validateDataLesson, getLessonByCourse);

//Quiz

/* Learning, Exam & Contest */

/* Monitoring & Reporting */

/* Settings */

export default router;