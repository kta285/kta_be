/**
 * @swagger
 * tags:
 *   name: Inquiry
 *   description: 1:1 문의 관련 API
 */

/**
 * @swagger
 * /inquiries/all:
 *   get:
 *     summary: 모든 1:1 문의 목록 가져오기
 *     tags: [Inquiry]
 *     responses:
 *       200:
 *         description: 문의 목록을 성공적으로 불러옴
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   inquiry_id:
 *                     type: integer
 *                     description: 문의 ID
 *                   title:
 *                     type: string
 *                     description: 문의 제목
 *                   inquiry_content:
 *                     type: string
 *                     description: 문의 내용
 *                   response_content:
 *                     type: string
 *                     description: 문의에 대한 응답 내용
 *                   user_id:
 *                     type: string
 *                     description: 사용자 ID
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */

/**
 * @swagger
 * /inquiries/submit:
 *   post:
 *     summary: 1:1 문의 제출
 *     tags: [Inquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 사용자 ID
 *               title:
 *                 type: string
 *                 description: 문의 제목
 *               content:
 *                 type: string
 *                 description: 문의 내용
 *     responses:
 *       201:
 *         description: 문의가 성공적으로 접수되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 문의가 성공적으로 접수되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */
