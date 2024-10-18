import express from 'express';
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 새로운 사용자를 데이터베이스에 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 description: 비밀번호는 최소 6자리 이상이어야 합니다.
 *               user_type:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - user_type
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청 (유효성 검증 실패)
 *       409:
 *         description: 이메일 중복
 *       500:
 *         description: 서버 오류
*/
router.post('/signup', signupController.signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자가 이메일과 비밀번호로 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자의 이메일 주소
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *       401:
 *         description: 로그인 실패 (잘못된 이메일 또는 비밀번호)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 일치하는 사용자 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 실패
 */
router.post('/login', loginController.login);

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 사용자 ID를 헤더에 포함하여 요청하면 해당 사용자의 정보를 반환합니다.
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: 사용자의 고유 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 정보를 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: 사용자의 고유 ID
 *                 name:
 *                   type: string
 *                   description: 사용자 이름
 *                 email:
 *                   type: string
 *                   description: 사용자 이메일
 *       401:
 *         description: 인증 오류 또는 사용자 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "DB: 사용자 정보 없음"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DB: 처리 오류"
 */
router.get('/info', userController.getUser)

module.exports = router;