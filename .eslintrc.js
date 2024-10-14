module.exports = {
  env: {
    node: true, // Node.js 환경에서 코드 실행
    es6: true, // ES6 문법 사용
  },
  extends: [
    'eslint:recommended', // 기본 추천 규칙 사용
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙
  ],
  parser: '@typescript-eslint/parser', // TypeScript 구문 분석기 사용
  parserOptions: {
    ecmaVersion: 2020, // ECMAScript 버전 설정
    sourceType: 'module', // ES 모듈 사용
  },
  plugins: [
    '@typescript-eslint', // TypeScript ESLint 플러그인
  ],
  rules: {
    // 규칙 설정
    'no-unused-vars': 'warn', // 사용하지 않는 변수에 대해 경고
    'no-console': 'off', // console.log 사용 허용
    indent: ['error', 2], // 들여쓰기를 2칸으로 설정
    quotes: ['error', 'single'], // 작은 따옴표 사용
    semi: ['error', 'always'], // 세미콜론 사용
  },
};
