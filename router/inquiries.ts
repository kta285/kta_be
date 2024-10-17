import { Router } from 'express';
import { submitInquiry } from '../controllers/inquiriesController';

const router = Router();

router.post('/submit', submitInquiry); // 1:1 문의 접수

module.exports = router;
