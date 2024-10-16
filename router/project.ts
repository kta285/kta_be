import express from 'express';
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
router.get('/all', projectController.getProjects); // 전체 이미지 목록 조회

/**
 * @swagger
 * /project/write:
 *   post:
 *     summary: 프로젝트 작성
 *     description: 프로젝트 정보를 데이터베이스에 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   amount:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   category:
 *                     type: string
 *                   status:
 *                     type: string
 *                 required:
 *                   - title
 *                   - content
 *                   - amount
 *                   - startDate
 *                   - endDate
 *                   - category
 *                   - status
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *       400:
 *         description: 잘못된 요청
 */
router.post('/write', projectController.postProjects); // 작성

module.exports = router;

module.exports = router;
