<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Sistema de gerenciamento de transportadora
</h3>

## Tecnologias

* [Node.js](https://nodejs.org/pt-br/)
* [Express.js](https://www.npmjs.com/package/express)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Sucrase](https://www.npmjs.com/package/sucrase)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Bcrypt](https://www.npmjs.com/package/bcryptjs)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Yup](https://www.npmjs.com/package/yup)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Prettier](https://www.npmjs.com/package/prettier)
* [EditorConfig](https://www.npmjs.com/package/editorconfig)


## Rotas

* `POST /sessions:` Realiza a autenticação;
```json
{
	"email": "admin@fastfeet.com",
	"password": "123456"
}
```

* `POST /recipients:` Adiciona um destinatário;
```json
{
	"name": "João Vitor Motta",
	"street": "Rua Sampaio",
	"number": 33,
	"complement": "Casa",
	"state": "RJ",
	"city": "Teresópolis",
	"cep": "21333-444"
}
```

* `GET /recipients:` Exibe uma lista de todos os destinatários;

* `PUT /recipients/:id:` Atualiza os dados de um destinatário pelo id.
```json
{
	"name": "João Vitor Motta",
	"street": "Rua Sampaio",
	"number": 33,
	"complement": "Casa",
	"state": "RJ",
	"city": "Teresópolis",
	"cep": "21333-444"
}
```


## Utilização

Após baixar o projeto pelo git clone, realize os seguintes passos:

```console
cd projects_and_tasks
yarn install
yarn dev
```
