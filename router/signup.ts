import express from 'express';
const signupContoller = require('../controllers/signupContoller');
const router = express.Router();

router.post('/signup', signupContoller.signup);

module.exports = router;
