import express from 'express';
const router = express.Router();
const mainController = require('../controllers/mainController'); // 오타 수정

// const multer = require('multer');

// const upload = multer({ storage: multer.memoryStorage() });

router.get('/img', mainController.getImges); // 전체 이미지 목록 조회

module.exports = router;
