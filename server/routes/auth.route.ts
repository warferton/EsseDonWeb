import express from 'express';
import AuthController from '../controller/authController';

const router = express.Router();

//Send email notifying about event booking
router.route('/login').get(AuthController.login);

//Send email request for band to perform
router.route('/logout').get(AuthController.logout);

export default router;