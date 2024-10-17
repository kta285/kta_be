const pool = require('../util/database');
import type { Request, Response } from 'express';

exports.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = `select * from Users where email = ? and password = ?`;
  try {
    const [results] = await pool.query(query, [email, password]);
    // 사용자 검증
    if (results.length === 0) {
      return res.status(401).json({ error: '일치하는 사용자 없음' });
    }

    // 로그인 성공
    const user = results[0];
    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    res.status(401).json({ message: '로그인 실패' });
  }
};
