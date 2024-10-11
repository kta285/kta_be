//npm init ===>package.json
//npm i express dotenv morgan --s
//npm i nodemon -g
const express = require('express');
const db = require('./util/database.ts');
const morgan = require('morgan');
const cors = require('cors');

const port: number = 3333;

const app = express();
//미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
//cors 관련 설정 미들웨어 : npm i cors --s
app.use(cors()); //모든 도메인 허용

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
