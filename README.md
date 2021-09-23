# inflearn_project

### 💎 개념정리
- Node.js : 브라우저 밖에서 javascript를 실행하기 위한 환경, 오픈소스
- Express.js : Node.js를 위한 프레임워크
- SSH : 깃허브 서버와의 안전한 통신을 위함
- BodyParser : Body 데이터 분석 -> req.body로 출력
- Postman : client를 대신하여 request를 보낼 수 있는 툴
- Nodemon : 소스 변경 시 자동으로 서버를 재시작해주는 툴
- Heroku : 비밀 정보 관리 (Git에 공개되는 것을 방지)
- Bcrypt : 비밀번호를 Database에 암호화하여 삽입해주는 툴
- jsonwebtoken : 토큰 생성을 위한 라이브러리
- CookieParser : cookie 정보를 가져오기 위함
<hr>

- npm : node package manager. 라이브러리를 설치하거나 빌드할 수 있음 -> registory에 저장
- npx : npm registory에서 create-react-app을 찾아 다운로드 없이 실행시켜줌 (global로 내 머신에 저장할 필요가 없음)
- webpack : src 관리 (이미지는 모두 src에 삽입). public은 X
- hoc : higher order component. 내부에 컴포넌트가 있는 function
- utills : 여러군데에서 사용할 수 있게 해줌
- App.js : 라우팅
- RRD : React Router Dom. 페이지 전환
- Axios : React js에서 request를 보내기 위함
- Proxy : client와 server의 port가 다를 때 발생하는 보안 문제(CORS : cross-origin resource sharing)를 해결하는 방법
  * ip를 임의로 변경
  * data 변경
  * 방화벽
  * 웹 필터
  * 캐시 데이터, 공유 데이터 제공
- Concorrently : front, back 서버를 한 번에 키기 위함
- antd : CSS Framework
- redux : 상태 관리 라이브러리 - props / state
- hooks : functional component에서 class component의 기능을 사용할 수 있게 함
