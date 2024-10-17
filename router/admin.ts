import express from 'express';
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/project/all', adminController.getProjects); // 전체 이미지 목록 조회

module.exports = router;