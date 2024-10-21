import express from 'express';
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupController.signup);

router.post('/login', loginController.login);

router.get('/info', userController.getUser);

router.post('/modify', userController.modifyUserInfo);

router.get('/projects', userController.getUsersProjects); // 로그인된 유저 프로젝트 목록 조회

module.exports = router;
