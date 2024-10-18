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

exports.getProjectsByUser = async (req: Request, res: Response) => {
  const userId = req.headers['user_id'];

  const query = `SELECT * FROM Projects where created_by = ?`;
  if (userId) {
    try {
      const [results] = await db.query(query, [userId]);
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

exports.postProjects = async (req: Request, res: Response) => {
  let {
    title,
    titleImg,
    amount,
    category,
    content,
    startDate,
    endDate,
    createdId,
  } = req.body.body;

  if (!(startDate instanceof Date && endDate instanceof Date)) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }
  try {
    const startDateFomat = startDate.toISOString().split('T')[0];
    const endDateFomat = endDate.toISOString().split('T')[0];
    await db.execute(
      'INSERT INTO starfunding.Projects (title,title_img, description, goal_amount,start_date,end_date,type,status,created_by) VALUES (?,?,?,?,?,?,?,?,?)',
      [
        title,
        titleImg,
        content,
        Number(amount),
        startDateFomat,
        endDateFomat,
        category,
        'pending',
        createdId,
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

exports.modifyProjectStatus = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const projectStatus = req.params.status;

  if (!['pending', 'ongoing', 'completed', 'failed'].includes(projectStatus)) {
    return res.status(500).json({ error: '잘못된 상태 변경 요청입니다.' });
  }

  let sql = `SELECT * FROM Projects WHERE project_id = ?`;
  try {
    const [selectedProject] = await db.query(sql, [projectId]); // query 결과 구조 분해 할당
    if (selectedProject.length > 0) {
      sql = `UPDATE Projects SET status = ? WHERE project_id = ?`; // id 대신 project_id로 수정
      try {
        await db.query(sql, [projectStatus, projectId]);
        return res.status(200).json({
          message: `프로젝트 상태가 "${projectId}"으로 변경되었습니다.`,
        });
      } catch (error) {
        return res.status(400).json({ error: '잘못된 상태 변경 요청입니다.' });
      }
    } else {
      return res.status(404).json({ error: '프로젝트를 찾을 수 없습니다.' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: '데이터베이스 요청 중 문제가 발생했습니다.' });
  }
};

exports.putProjectModify = async (req: Request, res: Response) => {
  const userId = req.headers.authorization;
  let {
    title,
    titleImg,
    amount,
    category,
    content,
    startDate,
    endDate,
    id,
    created_by,
  } = req.body.body;

  if (created_by.toString() !== userId) {
    return res.status(401).json({ error: '수정 권한이 없습니다' });
  }

  if (!(startDate instanceof Date && endDate instanceof Date)) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }

  try {
    const startDateFormat = startDate.toISOString().split('T')[0];
    const endDateFormat = endDate.toISOString().split('T')[0];

    const [existingProject] = await db.execute(
      'SELECT * FROM starfunding.Projects WHERE project_id = ?',
      [id],
    );

    if (!existingProject.length) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
    }

    await db.execute(
      'UPDATE starfunding.Projects SET title = ?, title_img = ?, description = ?, goal_amount = ?, start_date = ?, end_date = ?, type = ? WHERE project_id = ?',
      [
        title,
        titleImg,
        content,
        Number(amount),
        startDateFormat,
        endDateFormat,
        category,
        id,
      ],
    );

    await db.query('COMMIT');
    return res
      .status(200)
      .json({ message: '프로젝트가 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '수정 중 문제가 발생했습니다' });
  }
};

exports.deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.headers.authorization;

  try {
    const [existingProject] = await db.execute(
      'SELECT * FROM starfunding.Projects WHERE project_id = ?',
      [id],
    );

    if (!existingProject.length) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
    }
    if (existingProject[0].created_by.toString() !== userId) {
      return res.status(401).json({ error: '삭제 권한이 없습니다' });
    }

    await db.execute('DELETE FROM starfunding.Projects WHERE project_id = ?', [
      id,
    ]);
    await db.query('COMMIT');

    return res
      .status(200)
      .json({ message: '프로젝트가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '삭제 중 문제가 발생했습니다.' });
  }
};
