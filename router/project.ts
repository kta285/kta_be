import express from 'express';
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: 프로젝트 관련 API
 */

/**
 * @swagger
 * /project/all:
 *   get:
 *     summary: 전체 프로젝트 조회
 *     description: 모든 프로젝트의 목록을 조회합니다.
 *     tags:
 *       - Projects
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
router.get('/all', projectController.getProjects); // 전체 프로젝트 목록 조회


/**
 * @swagger
 * /project/my:
 *   get:
 *     summary: 로그인된 사용자의 프로젝트 목록 조회
 *     description: 사용자의 고유 ID를 헤더에 포함하여 요청하면 해당 사용자가 생성한 프로젝트 목록을 반환합니다.
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: 사용자의 고유 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 사용자의 프로젝트 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   project_id:
 *                     type: string
 *                     description: 프로젝트의 고유 ID
 *                   name:
 *                     type: string
 *                     description: 프로젝트 이름
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: 프로젝트 생성 날짜
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: 프로젝트 마지막 수정 날짜
 *       401:
 *         description: 헤더에 `user_id`가 없을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "header.user_id 없음"
 *       404:
 *         description: 사용자가 생성한 프로젝트가 없을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "DB: 사용자 정보 없음"
 *       500:
 *         description: 서버에서 오류가 발생했을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DB: 처리 오류"
 */

router.get('/my', projectController.getProjectsByUser); // 로그인된 유저 프로젝트 목록 조회

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: 프로젝트 세부 사항 조회
 *     description: 특정 ID의 프로젝트 정보를 반환합니다.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 프로젝트의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적인 응답
 *       404:
 *         description: 프로젝트를 찾을 수 없습니다.
 */
router.get('/:id', projectController.getProjectDetail); // 프로젝트 세부 정보 조회

/**
 * @swagger
 * /project/write:
 *   post:
 *     summary: 프로젝트 작성
 *     description: 프로젝트 정보를 데이터베이스에 추가합니다.
 *     tags:
 *       - Projects
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
 *                   titleImg:
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
router.post('/write', projectController.postProjects); // 프로젝트 작성

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: 프로젝트 수정
 *     description: 프로젝트 정보를 수정합니다.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 프로젝트의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: 프로젝트 수정에 필요한 데이터
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
 *                     description: 프로젝트 제목
 *                     example: 새 프로젝트 제목
 *                   titleImg:
 *                     type: string
 *                     description: 프로젝트 썸네일 이미지 (Base64)
 *                     example: data:image/png;base64,iVBORw...
 *                   amount:
 *                     type: integer
 *                     description: 목표 금액
 *                     example: 500000
 *                   category:
 *                     type: string
 *                     description: 프로젝트 카테고리
 *                     example: promotion
 *                   content:
 *                     type: string
 *                     description: 프로젝트 설명
 *                     example: 프로젝트 내용
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: 프로젝트 시작 날짜
 *                     example: 2024-10-17
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: 프로젝트 종료 날짜
 *                     example: 2024-12-17
 *     responses:
 *       200:
 *         description: 프로젝트가 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 프로젝트가 성공적으로 수정되었습니다.
 *       404:
 *         description: 프로젝트를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 프로젝트를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 수정 중 문제가 발생했습니다.
 */
router.put('/modify', projectController.putProjectModify); // 프로젝트 수정

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: "프로젝트 삭제"
 *     description: "프로젝트 ID에 해당하는 프로젝트를 삭제합니다."
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 프로젝트의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "성공적으로 프로젝트가 삭제되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "프로젝트가 성공적으로 삭제되었습니다."
 *       404:
 *         description: "프로젝트를 찾을 수 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "프로젝트를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제 중 문제가 발생했습니다."
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

router.delete('/:id', projectController.deleteProject); // 프로젝트 삭제
module.exports = router;
