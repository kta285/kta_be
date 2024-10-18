const pool = require('../util/database');
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';

exports.signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email.includes('@')) {
    return res
      .status(400)
      .json({ error: '유효한 이메일 주소를 입력해 주세요.' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: '비밀번호는 최소 6자리 이상이어야 합니다.' });
  }

  try {
    const checkQuery = `select * from Users where email = ?`;
    const [checkResults] = await pool.query(checkQuery, [email]);
    if (checkResults.length > 0) {
      return res.status(409).json({ error: '이미 등록된 이메일입니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, password);
    const query = `insert into Users (username, email, password) values (?,?,?)`;
    await pool.query(query, [username, email, hashedPassword]);
    res.status(201).json({ message: '회원가입 성공!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};
