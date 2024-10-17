import { Request, Response } from 'express';
const db = require('../util/database');

// 1:1 문의 데이터 인터페이스 정의
interface Inquiry {
  user_id?: string;
  title: string;
  content: string;
}

// 1:1 문의 처리 함수
export const submitInquiry = async (req: Request, res: Response): Promise<void> => {
  const { title, content }: Inquiry = req.body;

  try {
    const query = 'INSERT INTO Inquiry (title, inquiry_content) VALUES (?, ?)';
    await db.execute(query, [title, content]);

    res.status(201).json({ message: '문의가 성공적으로 접수되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
