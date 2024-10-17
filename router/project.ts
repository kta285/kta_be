import express from 'express';
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /project/all:
 *   get:
 *     summary: 전체 프로젝트 조회
 *     description: 모든 프로젝트의 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   project_id:
 *                     type: integer
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
 *       500:
 *         description: 서버 오류
 */
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
/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: 게시글 디테일
 *     description: 해당 id에 맞는 게시글 데이터가 반환됨.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 게시글의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/:id', projectController.getProjectDetail); // 게시글 디테일 가져오기

/**
 * @swagger
 * /project/{id}/{status}:
 *   put:
 *     summary: 프로젝트 상태 변경
 *     description: 주어진 ID에 해당하는 프로젝트의 상태를 변경합니다.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 프로젝트의 ID
 *         schema:
 *           type: integer
 *       - name: status
 *         in: path
 *         required: true
 *         description: 변경할 프로젝트 상태 (pending, ongoing, completed, failed 중 하나)
 *         schema:
 *           type: string
 *           enum: [pending, ongoing, completed, failed]
 *     responses:
 *       200:
 *         description: 프로젝트 상태가 성공적으로 변경됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "프로젝트 상태가 성공적으로 변경되었습니다."
 *       400:
 *         description: 잘못된 상태 값
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "잘못된 상태 변경 요청입니다."
 *       404:
 *         description: 프로젝트를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "프로젝트를 찾을 수 없습니다."
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "프로젝트 상태 업데이트 중 문제가 발생했습니다."
 */
router.put('/:id/:status', projectController.modifyProjectStatus);
module.exports = router;