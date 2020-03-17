<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/CodeAkio/FastFeet">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/CodeAkio/FastFeet">

  <a href="https://github.com/Rocketseat/semana-omnistack-10/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/CodeAkio/FastFeet">
  </a>
</p>

<h3 align="center">
  Sistema de gerenciamento de transportadora
</h3>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#utilização">Utilização</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

<p align="center">
  ![web](web.gif)
</p>

<br>

## Tecnologias

### Backend

* [Node.js](https://nodejs.org/pt-br/)
* [Express.js](https://www.npmjs.com/package/express)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Sucrase](https://www.npmjs.com/package/sucrase)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [pg](https://www.npmjs.com/package/pg)
* [Bcrypt](https://www.npmjs.com/package/bcryptjs)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Yup](https://www.npmjs.com/package/yup)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Prettier](https://www.npmjs.com/package/prettier)
* [EditorConfig](https://www.npmjs.com/package/editorconfig)
* [Multer](https://www.npmjs.com/package/multer)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Nodemailer](https://www.npmjs.com/package/nodemailer)
* [Redis](https://redis.io/)
* [Bee Queue](https://www.npmjs.com/package/bee-queue)
* [Date fns](https://www.npmjs.com/package/date-fns)

### Web

* [React.js](https://reactjs.org/)
* [React Redux](https://react-redux.js.org/)
* [Redux Saga](https://redux-saga.js.org/)
* [Redux Persist](https://www.npmjs.com/package/redux-persist)
* [Immer](https://github.com/immerjs/immer)
* [Reactotron](https://github.com/infinitered/reactotron)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Prettier](https://www.npmjs.com/package/prettier)
* [EditorConfig](https://www.npmjs.com/package/editorconfig)
* [Root Import](https://www.npmjs.com/package/babel-plugin-root-import)
* [Rewired](https://www.npmjs.com/package/rewire)
* [Prop Types](https://www.npmjs.com/package/prop-types)
* [Styled Components](https://github.com/styled-components/styled-components)
* [Polished](https://github.com/styled-components/polished)
* [React Icons](https://www.npmjs.com/package/react-icons)
* [React Router DOM](https://www.npmjs.com/package/react-router-dom)
* [History](https://www.npmjs.com/package/history)
* [Axios](https://www.npmjs.com/package/axios)
* [Yup](https://www.npmjs.com/package/yup)
* [Unform](https://unform.dev/)
* [React Select](https://react-select.com/home#async)
* [React Toastify](https://www.npmjs.com/package/react-toastify)
* [Date fns](https://www.npmjs.com/package/date-fns)

### Mobile

* [React Native](https://reactnative.dev/)
* [React Redux](https://react-redux.js.org/)
* [Redux Saga](https://redux-saga.js.org/)
* [Redux Persist](https://www.npmjs.com/package/redux-persist)
* [Async Storage](https://www.npmjs.com/package/async-storage)
* [Immer](https://github.com/immerjs/immer)
* [Reactotron](https://github.com/infinitered/reactotron)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Prettier](https://www.npmjs.com/package/prettier)
* [EditorConfig](https://www.npmjs.com/package/editorconfig)
* [Root Import](https://www.npmjs.com/package/babel-plugin-root-import)
* [Prop Types](https://www.npmjs.com/package/prop-types)
* [React Navigation](https://www.npmjs.com/package/react-navigation)
* [React Navigation Stack](https://www.npmjs.com/package/react-navigation-stack)
* [React Navigation Tabs](https://www.npmjs.com/package/react-navigation-tabs)
* [Styled Components](https://github.com/styled-components/styled-components)
* [Polished](https://github.com/styled-components/polished)
* [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons)
* [React Native step Indicator](https://www.npmjs.com/package/react-native-step-indicator)
* [Axios](https://www.npmjs.com/package/axios)
* [Date fns](https://www.npmjs.com/package/date-fns)
* [RNCamera](https://www.npmjs.com/package/react-native-camera)

## Utilização

Após baixar o projeto pelo **git clone**, realize os seguintes passos:

**No back-end:**

1. Instale o [node.js](https://nodejs.org/en/download/) e [yarn](https://classic.yarnpkg.com/pt-BR/docs/install/);

2. Instale e configure o **postgres**, **mongodb** e **redis**;

3. Crie e configure o arquivo **.env** seguindo o padrão do .envexample;

4. Execute os comandos abaixo:

```console
cd FastFeet/backend
yarn install
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
```

**Na web:**

1. Realize os passos do back-end;

2. Execute os comandos abaixo:

```console
cd FastFeet/web
yarn install
yarn start
```

**No mobile:**

1. Realize os passos do back-end;

2. [Instale o react native e configure Xcode e/ou Android Studio](https://docs.rocketseat.dev/ambiente-react-native/introducao);

3. Execute os comandos abaixo:

```console
cd FastFeet/mobile
yarn install
```

  3.1. Para iOS:

```console
react-native run-ios
```

  3.2. Para Android:

```console
react-native run-android
```
