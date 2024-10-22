import { Router } from 'express';
import {
  getInquiries,
  submitInquiry,
  putInquiry,
} from '../controllers/inquiriesController';

const router = Router();

router.post('/submit', submitInquiry); // 1:1 문의 접수
router.get('/all', getInquiries); // 문의 목록
router.put('/result', putInquiry); // 문의 수정

module.exports = router;
