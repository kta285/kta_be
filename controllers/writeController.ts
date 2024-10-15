const db = require('../util/database');
import type { Request, Response } from 'express';
exports.postWrite = async (req: Request, res: Response) => {
  let { title, amount, category, content, startDate, endDate } = req.body.body;
  // console.log(
  //   title,
  //   amount,
  //   category,
  //   content,
  //   startDate,
  //   endDate,
  //   // req.body,
  //   'ddd',
  // );
  if (!(startDate instanceof Date && endDate instanceof Date)) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }
  try {
    const startDateFomat = startDate.toISOString().split('T')[0];
    const endDateFomat = endDate.toISOString().split('T')[0];
    const [result] = await db.execute(
      'INSERT INTO starfunding.Projects (title, description, goal_amount,start_date,end_date,type,status) VALUES (?,?,?,?,?,?)',
      [
        title,
        content,
        amount,
        startDateFomat,
        endDateFomat,
        category,
        'pending',
      ],
    );
    await db.query('COMMIT');
    return res.status(200).json({ message: '작성완료' });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: '문제가 발생했습니다' });
  }
};
