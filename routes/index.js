import { login, logout } from '../controller/AuthController.js';
import { getUser, getUserById, updateUser, deleteUser, addUser } from '../controller/UserController.js';
import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { validateDataUser, validateUser } from '../validator/User.js';

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

/* Learning, Exam & Contest */

/* Monitoring */

/* Reporting */

/* Settings */

export default router;