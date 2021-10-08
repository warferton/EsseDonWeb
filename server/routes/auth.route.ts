import express from 'express';
import { extractJWT } from '../util/jwt-util';
import AuthController from '../controller/authController';

const router = express.Router();

//Validate the user
router.route('/validate').get(extractJWT).get(AuthController.validate);

//Log user in
router.route('/login').post(AuthController.login);

//Perform user logout action
router.route('/logout').post(AuthController.logout);

router.route('/register').post(AuthController.register);

export default router;