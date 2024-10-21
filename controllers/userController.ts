const pool = require('../util/database');
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

exports.getUser = async (req: Request, res: Response) => {
  const userId = req.headers['user_id'];
  const query = `SELECT * FROM Users where user_id = ?`;
  if (userId) {
    try {
      const [results]: any = await pool.query(query, [userId]);

      // 사용자 검증
      if (results.length === 0) {
        return res.status(404).json({ error: 'DB: 사용자 정보 없음' });
      }

      // 로그인 성공
      const userInfo = results[0];

      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ message: 'DB: 처리 오류' });
    }
  } else {
    res.status(400).json({ message: 'header.user_id 없음' });
  }
};


exports.getUsersProjects = async (req: Request, res: Response) => {
  const userId = req.headers['user_id'];

  const query = `SELECT * FROM Projects where created_by = ?`;
  if (userId) {
    try {
      const [results] = await pool.query(query, [userId]);
      // 사용자 검증
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: 'DB: 사용자 id로 조회된 항목 없음' });
      }
      // 프로젝트 정보 반환
      const projects = results;
      res.status(200).json(projects);
    } catch (error) {
      console.log('DB Error:', error); // 디버깅용 에러 출력
      res.status(500).json({ message: 'DB: 처리 오류' });
    }
  } else {
    res.status(401).json({ message: 'header.user_id 없음' });
  }
};

exports.modifyUserInfo = async (req: Request, res: Response) => {
  const { username, currentPassword, password, userId } = req.body;

  if (!username || !currentPassword) {
    return res.status(400).json({
      message: 'username과 currentPassword는 필수 항목입니다.',
    });

  }

  try {
    // 1. 사용자 정보 조회 (기존 비밀번호 확인)
    const [user]: any = await pool.query(
      `SELECT password FROM Users WHERE user_id = ?`,
      [userId],
    );

    if (user.length === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 기존 비밀번호가 맞는지 확인 (bcrypt.compare 사용)
    const storedPassword = user[0].password;
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      storedPassword,
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: '기존 비밀번호가 일치하지 않습니다.',
      });
    }

    // 3. 비밀번호가 일치하면 업데이트 쿼리 실행
    let query = `UPDATE Users SET username = ?`;
    const queryParams: (string | undefined)[] = [username];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = ?`; // 비밀번호 변경 포함
      queryParams.push(hashedPassword);
    }

    query += ` WHERE user_id = ?`;
    queryParams.push(userId);

    const [results]: any = await pool.query(query, queryParams);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: '사용자 정보를 업데이트하지 못했습니다.' });
    }

    // 4. 성공적으로 업데이트한 경우 응답
    res
      .status(200)
      .json({ message: '사용자 정보가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('DB 처리 오류:', error);
    res.status(500).json({ message: 'DB 처리 오류가 발생했습니다' });
  }
};