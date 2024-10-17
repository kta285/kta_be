const db = require('../util/database');
import type { Request, Response } from 'express';

exports.getProjects = async (req: Request, res: Response) => {
  const sql = `select * from Projects order by project_id`;
  try {
    const projects = await db.query(sql);
    return res.status(200).json(projects[0]);
  } catch (error) {
    return res.status(500).json({ error: '문제가 발생했습니다' });
  }
};