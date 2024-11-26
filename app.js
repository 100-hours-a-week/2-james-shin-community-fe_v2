//Express.js 라이브러리를 임포트하여 웹 서버를 생성하는데 사용
// 서버를 구축하고 HTTP 요청을 처리하는 기능을 제공
const express = require('express');
// Node.js의 내장 모듈인 path를 임포트하여 파일 경로를 조작하거나 해석하는 데 사용
const path = require('path');
// Express 애플리케이션 인스턴스를 생성, app 객체를 사용하여 서버 동작, 라우트 정의, 미들웨어 설정 가능
const app = express();
// 서버가 실행될 포트를 설정(5555번 포트 사용)
const PORT = 5555;

//--------정적 파일 제공-----------
// 클라이언트가 JSON 데이터를 보낼 경우 이를 자동으로 파싱해 req.body로 사용 가능
app.use(express.json());
// 오류 발생 시 클라이언트에 상태 코드와 에러 메시지를 JSON 형태로 반환
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message, data: null });
});
// resources 디렉토리 내 모든 파일을 정적으로 제공
app.use(express.static(path.join(__dirname, 'resources')));
// resources/css 디렉토리의 파일을 /css 경로로 제공
app.use('/css', express.static(path.join(__dirname, 'resources/css')));

//--------GET 라우트 설정-----------
// 1.루트 경로
// 클라이언트가 루트 경로로 요청하면 app/views/login.html 파일을 반환
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/views/login.html'));
});
// 2.회원가입 경로
// 클라이언트가 /register로 요청하면 register.html 파일을 반환
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/views/register.html'));
});
// 3.로그인 
// 클라이언트가 /login으로 요청하면 login.html 파일을 반환
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/views/login.html'));
});

//----------서버 시작------------
// listen 메서드로 서버 실행하여 지정된 PORT(5555)에서 요청을 수신
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});