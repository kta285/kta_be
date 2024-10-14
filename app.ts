import type { Request, Response } from 'express';
const express = require('express');
const db = require('./util/database.ts');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = require('./swagger/config');
const port: number = 3333;

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Swagger 스펙 정의
const swaggerDocs = swaggerJsDoc(swaggerConfig);

// Swagger UI 설정
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
