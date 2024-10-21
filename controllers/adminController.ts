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

exports.putProjectModify = async (req: Request, res: Response) => {
  let { title, titleImg, amount, category, content, startDate, endDate, id } =
    req.body;

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

exports.deleteAdminProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [existingProject] = await db.execute(
      'SELECT * FROM starfunding.Projects WHERE project_id = ?',
      [id],
    );

    if (!existingProject.length) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
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

// 이미지 생성 (파일 업로드 및 데이터베이스 저장)
exports.createImage = async (req: Request, res: Response) => {
  const { images, link } = req.body; // 클라이언트에서 이미지 URL과 설명을 받음
  const sql = `INSERT INTO image (images, link) VALUES (?, ?)`;

  try {
    await db.query(sql, [images, link]);
    return res
      .status(201)
      .json({ message: '이미지 URL이 성공적으로 저장되었습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: '이미지 URL을 저장하는 중 문제가 발생했습니다.' });
  }
};

exports.updateImage = async (req: Request, res: Response) => {
  const { id } = req.params; // 수정할 이미지의 ID
  console.log(id, 'ss');

  const { images, link } = req.body; // 클라이언트에서 이미지 URL과 설명을 받음
  const sql = `UPDATE image SET images = ?, link = ? WHERE idx = ?`;

  try {
    const [result] = await db.query(sql, [images, link, id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: '해당 ID의 이미지를 찾을 수 없습니다.' });
    }

    return res
      .status(200)
      .json({ message: '이미지 URL이 성공적으로 수정되었습니다.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: '이미지 정보를 수정하는 중 문제가 발생했습니다.' });
  }
};
