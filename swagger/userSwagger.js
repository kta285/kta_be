/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: 유저 API
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 새로운 사용자를 데이터베이스에 등록합니다.
 *     tags:
 *       - Users
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

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자가 이메일과 비밀번호로 로그인합니다.
 *     tags:
 *       - Users
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

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 사용자 ID를 헤더에 포함하여 요청하면 해당 사용자의 정보를 반환합니다.
 *     tags:
 *       - Users
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

/**
 * @swagger
 * /user/modify:
 *   post:
 *     summary: 사용자 정보 수정
 *     description: 사용자가 자신의 정보를 수정할 수 있습니다. username과 currentPassword는 필수 항목이며, password는 선택 항목입니다.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - username
 *               - currentPassword
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자의 고유 ID
 *                 example: "1234"
 *               username:
 *                 type: string
 *                 description: 변경할 사용자 이름
 *                 example: "new_username"
 *               currentPassword:
 *                 type: string
 *                 description: 현재 비밀번호
 *                 example: "current_password123"
 *               password:
 *                 type: string
 *                 description: 새 비밀번호 (선택 사항)
 *                 example: "new_password123"
 *     responses:
 *       200:
 *         description: 사용자 정보가 성공적으로 변경되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사용자 정보가 성공적으로 변경되었습니다."
 *       400:
 *         description: 요청 본문에 필수 필드가 누락되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "username과 currentPassword는 필수 항목입니다."
 *       401:
 *         description: 기존 비밀번호가 일치하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "기존 비밀번호가 일치하지 않습니다."
 *       404:
 *         description: 사용자가 존재하지 않거나 업데이트가 실패했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사용자를 찾을 수 없습니다."
 *       500:
 *         description: 데이터베이스 처리 중 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DB 처리 오류가 발생했습니다."
 */

/**
 * @swagger
 * /user/projects:
 *   get:
 *     summary: 로그인된 사용자가 생성한 프로젝트 목록 조회
 *     description: 사용자의 고유 ID를 헤더에 포함하여 요청하면 해당 사용자가 생성한 프로젝트 목록을 반환합니다.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: 사용자의 고유 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 프로젝트 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   project_id:
 *                     type: integer
 *                     description: 프로젝트의 고유 ID
 *                   name:
 *                     type: string
 *                     description: 프로젝트 이름
 *                   description:
 *                     type: string
 *                     description: 프로젝트 설명
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: 프로젝트 생성일
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: 프로젝트 마지막 수정일
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
 *         description: 주어진 `user_id`로 생성된 프로젝트가 없을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DB: 사용자 id로 조회된 항목 없음"
 *       500:
 *         description: 서버에서 처리 오류가 발생했을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DB: 처리 오류"
 */