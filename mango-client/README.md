This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


---


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