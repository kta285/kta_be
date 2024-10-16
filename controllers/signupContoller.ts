const pool = require('../util/database');

import type { Request, Response } from 'express';

exports.signup = async (req: Request, res: Response) => {
  const { username, email, password, user_type } = req.body;
  console.log(req.body);
  try {
    const checkQuery = `select * from Users where email = ?`;
    const [checkResults] = await pool.query(checkQuery, [email]);
    if (checkResults.length > 0) {
      return res.status(409).json({ error: '이미 등록된 이메일입니다.' });
    }

    const query = `insert into Users (username, email, password, user_type) values (?,?,?,?)`;
    await pool.query(query, [username, email, password, user_type]);
    res.status(201).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};
