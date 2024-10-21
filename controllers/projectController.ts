const db = require('../util/database');
import type { Request, Response } from 'express';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, 'uploads/'); // 저장할 폴더
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 고유한 파일명 생성
  },
});

const upload = multer({ storage: storage });

// 썸네일 이미지 업로드 처리 라우트
exports.uploadThumbnail = upload.single('thumbnail');


exports.getProjects = async (req: Request, res: Response) => {
  // const sql = `select * from Projects order by end_date desc`;
  const sql = `
  SELECT project_id, created_by, title, goal_amount, current_amount, status, start_date, end_date, type, title_img
FROM Projects
ORDER BY end_date DESC;`;
  try {
    const projects = await db.query(sql);
    return res.status(200).json(projects[0]);
  } catch (error) {
    return res.status(500).json({ error: '문제가 발생했습니다' });
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
exports.supportProject = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  const userId = req.headers.authorization;
  console.log(project_id, req.params, userId, 'dsdsdsdsddsz');

  const fundingAmount = 5000;
  try {
    // 1. 프로젝트가 존재하는지 확인
    const [existingProject] = await db.execute(
      'SELECT * FROM starfunding.Projects WHERE project_id = ?',
      [project_id],
    );

    if (!existingProject.length) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
    }

    // 2. 트랜잭션 시작
    await db.query('START TRANSACTION');

    // 3. 프로젝트의 current_amount 업데이트
    await db.execute(
      'UPDATE starfunding.Projects SET current_amount = current_amount + ? WHERE project_id = ?',
      [fundingAmount, project_id],
    );

    // 4. 유저의 funding 정보 가져오기
    const [user] = await db.execute(
      'SELECT funding FROM starfunding.Users WHERE user_id = ?',
      [userId],
    );

    if (!user.length) {
      await db.query('ROLLBACK');
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }

    // 5. 유저의 기존 funding 문자열에 새 프로젝트 ID 추가
    const currentFunding = user[0].funding || ''; // 기존 펀딩 정보
    const newFunding = currentFunding
      ? `${currentFunding},${project_id}`
      : project_id;

    // 6. 유저의 funding 정보 업데이트
    await db.execute(
      'UPDATE starfunding.Users SET funding = ? WHERE user_id = ?',
      [newFunding, userId],
    );

    // 7. 트랜잭션 커밋
    await db.query('COMMIT');

    return res.status(200).json({
      message: '펀딩이 성공적으로 완료되었습니다.',
      updatedFunding: newFunding,
    });
  } catch (error) {
    // 에러 발생 시 트랜잭션 롤백
    await db.query('ROLLBACK');
    console.error('펀딩 중 오류 발생:', error);
    return res.status(500).json({ error: '펀딩 중 오류가 발생했습니다.' });
  }
};
