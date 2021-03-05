<h1  align="center">
<img  alt="Launchbase"  src="https://user-images.githubusercontent.com/63380367/110002753-829b1c80-7cf4-11eb-99c9-ea2abf316fe1.png"  width="400px" />
</h1>

<h1 align="center"> 🍽️ FoodFy - Bootcamp Launchbase </h1>

<h4 align="center"><i>Site de gerencimaneto de receitas feito durante o Bootcamp LaunchBase da <a href="https:://rocketseat.com.br">Rocketseat!🚀</a></i></h4> 

___

## 📝 Descrição

_**Este trabalho foi desenvolvido como requisito para obtenção do certificado de conclusão do curso Bootcamp Launchbase da RocketSeat.
Consiste em um site de gerenciamento de receitas com as seguintes funcionalidades:**_

* *Homepage com acesso livre a chefes e receitas* ;
* *Pesquisa de receitas cadastradas* ;
* *Sistema de login para usuários previamente cadastrados* ;
* *Área administrativa restrita a usuários cadastrados* ;
* *Cadastramento de novos usuários realizado pelo usuário administrador, bem como sua edição e exclusão* ;
* *Cadastramento, edição e exclusão de chefes realizado pelo usuário administrador* ;
* *Cadastramento de receitas, edição e exclusão realizado por qualquer usuário previamente cadastrado* ;
___
## 💻 Tecnologias Utilizadas

*Esse projeto foi efetuado com diversas tecnologias.  Abaixo estão listadas algumas delas:*

* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [CSS3](https://developer.mozilla.org/docs/Web/CSS)
* [Express](https://expressjs.com/)
* [Express Session](https://www.npmjs.com/package/express-session)
* [HTML5](https://developer.mozilla.org/docs/Web/HTML)
* [Javascript](https://developer.mozilla.org/docs/Web/JavaScript)
* [Multer](https://www.npmjs.com/package/multer)
* [Node.js](https://nodejs.org/)
* [Nodemailer](https://nodemailer.com/about/)
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [NPM](https://docs.npmjs.com/about-npm)
* [PostgreSQL](https://www.postgresql.org/)
___

## 🛠️ Instalação

_**Abaixo seguem instruções para instalação do FoodFy :**_

1. *É necessário instalar o [Node.Js](https://nodejs.org/en/), o [PostgreSQL](https://www.postgresql.org/) e o [Postbird](https://www.electronjs.org/apps/postbird)* ;
2. *Clone este repositório e abra-o em seu editor de códigos* ;
3. *Crie o banco de dados e as tabelas usando o arquivo "FoodFy.sql"* ;
4. *Configure o arquivo "src/config/db.js" com seu nome de usuário e senha do Postgres* ;
5. *Popule o banco de dados com o arquivo "seeds.js" (rodar no terminal - node seeds.js)* ;
6. *Iniciar a aplicação (rodar no terminal - npm start)* ;
___

## 🕹️ Usando Foodfy

_**Recomendações de uso do Foodfy :**_

* *Ao iniciar a aplicação não haverá nenhuma receita ou chefe cadastrados.*
* *Para realizar o cadastro de chefes e receitas pela primeira vez :*
   * *No banco de dados copiar login e senha de um usuário marcado como "true" no campo is_admin ;*
   * *Efetuar o login ;*
   * *É preciso criar um chefe antes de adicionar uma receita ;*
   * *Depois de criar um chefe, crie uma receita.*
