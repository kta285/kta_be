import express from 'express';
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/project/all', adminController.getProjects); // 전체 이미지 목록 조회
router.put('/project', adminController.putProjectModify); // 전체 이미지 목록 조회
router.delete('/project/:id', adminController.deleteAdminProject); // 전체 이미지 목록 조회
router.post('/image', adminController.createImage); // 전체 이미지 목록 조회
router.put('/image/:id', adminController.updateImage); // 전체 이미지 목록 조회

module.exports = router;
