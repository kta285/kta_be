import { Request, Response } from 'express';
const db = require('../util/database');

// 1:1 문의 데이터 인터페이스 정의
interface Inquiry {
  user_id?: string;
  title: string;
  content: string;
}

// 1:1 문의 처리 함수
export const submitInquiry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title, content, user_id }: Inquiry = req.body;

  try {
    const query =
      'INSERT INTO Inquiry (title, inquiry_content, user_id) VALUES (?, ?, ?)';
    await db.execute(query, [title, content, user_id]);

    res.status(201).json({ message: '문의가 성공적으로 접수되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
export const putInquiry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { response_content, inquiry_id } = req.body;

  try {
    const query =
      'UPDATE Inquiry SET response_content = ? WHERE inquiry_id = ?';
    const [result] = await db.execute(query, [response_content, inquiry_id]);

    // result가 존재하고, 수정된 행이 있는지 확인
    if (result && result.affectedRows > 0) {
      res.status(200).json({ message: '문의가 성공적으로 수정되었습니다.' });
    } else {
      res.status(404).json({ message: '해당 ID의 문의를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
// 문의 목록 불러오는 함수
export const getInquiries = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const query = 'SELECT * FROM Inquiry';
    const inquiries = await db.execute(query, []);

    res.status(201).json(inquiries[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
