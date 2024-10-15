import express from 'express';
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
router.get('/all', projectController.getProjects); // 전체 이미지 목록 조회

module.exports = router;