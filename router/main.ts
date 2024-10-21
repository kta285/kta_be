import express from 'express';
const router = express.Router();
const mainController = require('../controllers/mainController'); // 오타 수정

router.get('/img', mainController.getImges); // 전체 이미지 목록 조회

module.exports = router;
