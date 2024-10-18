import { Request, Response, NextFunction } from 'express';
const pool = require('../util/database');

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
  };
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const user_id = req.headers['authorization'];

  if (!user_id) {
    return res.status(401).json({ error: '토큰이 필요합니다.' });
  }

  /*userid가 숫자인지 확인 
  db에서 userid는 숫자로 자동생성되고, 그 값이 클라이언트에게 전달됨. 
  근데 클라이언트에서 서버로 보낼 때는 문자열 형태로 보내짐.
  근데 여기서 잘못된 userid 대신 다른 문자열을 전송할 수도 있음. 그래서 이 작업이 필요한 것.
  */
  const parsedUserId = parseInt(user_id as string, 10);
  if (isNaN(parsedUserId)) {
    return res.status(401).json({ error: '유효하지 않은 사용자 ID입니다.' });
  }

  // 데이터베이스에서 userId 확인
  const query = `SELECT * FROM Users WHERE user_id = ?`;
  const [results] = await pool.query(query, [parsedUserId]);

  if (results.length === 0) {
    return res.status(403).json({ error: '유효하지 않은 사용자입니다.' });
  }
  req.user = { user_id: parsedUserId };
  next();
};

module.exports = { authenticateUser };
