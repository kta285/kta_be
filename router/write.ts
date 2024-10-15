import express from 'express';
const router = express.Router();
const writeController = require('../controllers/writeController');

/**
 * @swagger
 * /write:
 *   post:
 *     summary: 작성
 *     description: 전체 이미지 목록을 반환합니다.
 *     responses:
 *       200:
 *         description: 성공적인 응답
 */

router.post('/', writeController.postWrite); // 작성

module.exports = router;
