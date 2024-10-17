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

exports.postProjects = async (req: Request, res: Response) => {
  let { title, titleImg, amount, category, content, startDate, endDate } =
    req.body.body;
  if (!(startDate instanceof Date && endDate instanceof Date)) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }
  try {
    const startDateFomat = startDate.toISOString().split('T')[0];
    const endDateFomat = endDate.toISOString().split('T')[0];
    await db.execute(
      'INSERT INTO starfunding.Projects (title,title_img, description, goal_amount,start_date,end_date,type,status) VALUES (?,?,?,?,?,?,?,?)',
      [
        title,
        titleImg,
        content,
        Number(amount),
        startDateFomat,
        endDateFomat,
        category,
        'pending',
      ],
    );
    await db.query('COMMIT');
    return res
      .status(200)
      .json({ message: '프로젝트가 성공적으로 작성되었습니다.' });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: '문제가 발생했습니다' });
  }
};

exports.getProjectDetail = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const sql = `SELECT * FROM Projects WHERE project_id = ?`;
  try {
    const projectsDetail = await db.query(sql, [projectId]);
    return res.status(200).json(projectsDetail[0]);
  } catch (error) {
    return res.status(500).json({ error: '문제가 발생했습니다' });
  }
};
