import express from 'express';
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/all', projectController.getProjects); // 전체 프로젝트 목록 조회

router.get('/:id', projectController.getProjectDetail); // 프로젝트 세부 정보 조회

// router.post('/write', projectController.postProjects); // 프로젝트 작성

router.put('/modify', projectController.putProjectModify); // 프로젝트 수정

router.put('/:id/:status', projectController.modifyProjectStatus); // 프로젝트 상태값 변경

router.post('/support/:project_id', projectController.supportProject); // 펀딩

router.delete('/:id', projectController.deleteProject); // 프로젝트 삭제

router.post('/write', projectController.uploadThumbnail, projectController.postProjects);

module.exports = router;
