import express from 'express';
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupController.signup);

router.post('/login', loginController.login);

router.get('/info', userController.getUser);

router.post('/modify', userController.modifyUserInfo);
module.exports = router;
