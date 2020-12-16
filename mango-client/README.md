## React 프로젝트

```
src
│   App.tsx
│   index.tsx
│
└───actions - action type, action method를 모아둔 폴더
│       ActionTypes.ts - 인증 상태
│       authentication.ts - 인증 관련 action method
│
└───api - HTTP 통신, webSocket 관련 로직
│       chat.t.ts
│       login.t.ts
│      
└───components - UI 컴포넌트
│       
│
└───containers - 여러 개의 컴포넌트로 구성, 데이터나 공통 객체, 컴포넌트 간의 인터랙션 등
│       LoginFormContainer.tsx - 로그인 
│       RouteAuthenticatedCheck.tsx - 인증여부 체크
│       RouteAuthorizedCheck.tsx - 인가여부 체크
│
└───models - model 객체
│       index.ts
│
└───pages - routing 파일
│       
│
└───reducers - action method에서 변경한 상태를 받아 새로운 상태로 변경하는 역할
│       index.ts
│
└───sagas - redux-saga
│       
│
└───store - 미들웨어 설정
│       chat.ts
│       index.ts
│       login.ts
│
└───types
│       
│
...

```