const pool = require('../util/database');
import type { Request, Response } from 'express';

exports.getUser = async (req: Request, res: Response) => {
  const userId = req.headers["user_id"];
  const query = `SELECT * FROM Users where user_id = ?`;
  if (userId) {
    try {
      const [results] = await pool.query(query, [userId]);
      // 사용자 검증
      if (results.length === 0) {
        return res.status(401).json({ error: 'DB: 사용자 정보 없음' });
      }
      // 로그인 성공
      const userInfo = results[0];
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(401).json({ message: 'DB: 처리 오류' });
    }
  }else res.status(401).json({ message: 'header.user_id 없음' });
};