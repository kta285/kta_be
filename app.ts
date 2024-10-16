const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = require('./swagger/config');
const port: number = 3333;
const main = require('./router/main');
const project = require('./router/project');
const write = require('./router/write');
const signup = require('./router/signup');
const app = express();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(cors());
// 요청 본문 크기 제한을 10MB로 설정 (필요에 따라 더 크게 조정 가능)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Swagger 스펙 정의
const swaggerDocs = swaggerJsDoc(swaggerConfig);

app.use('/', main);
app.use('/project', project);
app.use('/write', write);
app.use('/user', signup);

// Swagger UI 설정
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
