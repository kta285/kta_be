import express from 'express';
const signupContoller = require('../controllers/signupContoller');
const router = express.Router();

/**
 * @swagger
 * /signup:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입 성공!
 *       400:
 *         description: 잘못된 요청 (유효성 검증 실패)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 유효한 이메일 주소를 입력해 주세요.
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 이미 등록된 이메일입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 문제가 발생했습니다.
 */
router.post('/signup', signupContoller.signup);

module.exports = router;
