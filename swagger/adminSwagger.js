/**
 * @swagger
 * tags:
 *   - name: admin
 *     description: 사이트 관리용 admin API
 */

/**
 * @swagger
 * /admin/project/all:
 *   get:
 *     tags:
 *       - admin
 *     summary: 모든 프로젝트 가져오기
 *     description: 프로젝트 목록을 불러옵니다.
 *     responses:
 *       200:
 *         description: 프로젝트 목록을 성공적으로 불러왔습니다.
 *       500:
 *         description: 서버에 문제가 발생했습니다.
 */

/**
 * @swagger
 * /admin/project:
 *   put:
 *     tags:
 *       - admin
 *     summary: 프로젝트 수정
 *     description: 프로젝트의 제목, 이미지, 목표 금액, 카테고리, 시작일, 종료일을 수정합니다.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               titleImg:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로젝트가 성공적으로 수정되었습니다.
 *       404:
 *         description: 프로젝트를 찾을 수 없습니다.
 *       500:
 *         description: 수정 중 문제가 발생했습니다.
 */

/**
 * @swagger
 * /admin/project/{id}:
 *   delete:
 *     tags:
 *       - admin
 *     summary: 프로젝트 삭제
 *     description: 프로젝트를 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 삭제할 프로젝트의 ID
 *     responses:
 *       200:
 *         description: 프로젝트가 성공적으로 삭제되었습니다.
 *       404:
 *         description: 프로젝트를 찾을 수 없습니다.
 *       500:
 *         description: 삭제 중 문제가 발생했습니다.
 */

/**
 * @swagger
 * /admin/image:
 *   post:
 *     tags:
 *       - admin
 *     summary: 이미지 생성
 *     description: 이미지 URL을 저장합니다.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: 이미지 URL이 성공적으로 저장되었습니다.
 *       500:
 *         description: 이미지 URL을 저장하는 중 문제가 발생했습니다.
 */

/**
 * @swagger
 * /admin/image/{id}:
 *   put:
 *     tags:
 *       - admin
 *     summary: 이미지 수정
 *     description: 저장된 이미지의 URL과 설명을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 수정할 이미지의 ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: 이미지 URL이 성공적으로 수정되었습니다.
 *       404:
 *         description: 해당 ID의 이미지를 찾을 수 없습니다.
 *       500:
 *         description: 이미지 정보를 수정하는 중 문제가 발생했습니다.
 */

/**
 * @swagger
 * /inquiries/result:
 *   put:
 *     summary: 1:1 문의 응답 수정
 *     tags: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inquiry_id
 *               - response_content
 *             properties:
 *               inquiry_id:
 *                 type: integer
 *                 description: 수정할 문의의 ID
 *               response_content:
 *                 type: string
 *                 description: 문의에 대한 응답 내용
 *     responses:
 *       200:
 *         description: 문의가 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 문의가 성공적으로 수정되었습니다.
 *       404:
 *         description: 해당 ID의 문의를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 해당 ID의 문의를 찾을 수 없습니다.
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
