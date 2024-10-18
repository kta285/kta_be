const db = require('../util/database');
import type { Request, Response } from 'express';
exports.getImges = async (req: Request, res: Response) => {
  const sql = `select * from image order by idx `;
  try {
    const imges = await db.query(sql);

    return res.status(200).json(imges[0]);
  } catch (error) {
    return res.status(500).json({ error: '문제가 발생했습니다' });
  }
};
