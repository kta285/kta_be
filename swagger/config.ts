const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['./swagger/*.js'], // 이 경로가 정확한지 확인 (TypeScript 사용 시는 .ts로)
};
module.exports = swaggerOptions;
