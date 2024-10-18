const pool = require('../util/database');
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

exports.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = `select * from Users where email = ?`;
  try {
    const [results] = await pool.query(query, [email]);
    // 사용자 검증
    if (results.length === 0) {
      return res.status(401).json({ error: '일치하는 사용자 없음' });
    }

    // 로그인 성공
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    // user_id를 "토큰"으로 사용
    const user_id = user.user_id;
    console.log(user_id);

    res.status(200).json({
      message: '로그인 성공',
      user_id: user_id,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: '로그인 실패', error });
  }
};
