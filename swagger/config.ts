// Swagger 옵션 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI 버전
    info: {
      title: 'API Documentation', // 문서 제목
      version: '1.0.0', // 버전
      description: 'API 문서', // 설명
    },
    servers: [
      {
        url: 'http://localhost:3333', // 서버 URL
      },
    ],
  },
  apis: ['./*.ts'], // 주석이 포함된 API 파일 경로
};

module.exports = swaggerOptions;
