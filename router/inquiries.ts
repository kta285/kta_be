import { Router } from 'express';
import { getInquiries, submitInquiry } from '../controllers/inquiriesController';

const router = Router();

router.post('/submit', submitInquiry); // 1:1 문의 접수
router.get('/all', getInquiries) // 문의 목록

module.exports = router;
