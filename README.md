<h1  align="center">
<img  alt="Launchbase"  src="https://user-images.githubusercontent.com/63380367/110002753-829b1c80-7cf4-11eb-99c9-ea2abf316fe1.png"  width="400px" />
</h1>

<h1 align="center"> 🍽️ FoodFy - Bootcamp Launchbase </h1>

<h4 align="center"><i>Site de gerencimaneto de receitas feito durante o Bootcamp LaunchBase da <a href="https:://rocketseat.com.br">Rocketseat!🚀</a></i></h4> 

___

<h2 align="center">Sumário</h2>

<p  align="center"><b>
<a  href="#memo-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#computer-tecnologias-utilizadas">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#hammer_and_wrench-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#joystick-usando-foodfy">Usando FoodFy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#warning-atenção-rocketseat"> Ao Time Rocketseat</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#handshake-agradecimentos"> Agradecimentos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#balance_scale-licença">Licença</a>
</b></p>

___
## :memo: Descrição

_**Este trabalho foi desenvolvido como requisito para obtenção do certificado de conclusão do curso Bootcamp Launchbase da RocketSeat.
Consiste em um site de gerenciamento de receitas com as seguintes funcionalidades:**_

* *Homepage com acesso livre a chefes e receitas ;*
* *Pesquisa de receitas cadastradas ;*
* *Sistema de login para usuários previamente cadastrados ;*
* *Área administrativa restrita a usuários cadastrados ;*
* *Cadastramento de novos usuários realizado pelo usuário administrador, bem como sua edição e exclusão ;*
* *Cadastramento, edição e exclusão de chefes realizado pelo usuário administrador ;* 
* *Cadastramento de receitas, edição e exclusão realizado por qualquer usuário previamente cadastrado .*
___
## :computer: Tecnologias Utilizadas

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

## :hammer_and_wrench: Instalação

_**Abaixo seguem instruções para instalação do FoodFy :**_

1. *É necessário instalar o [Node.Js](https://nodejs.org/en/), o [PostgreSQL](https://www.postgresql.org/) e o [Postbird](https://www.electronjs.org/apps/postbird) ;* 
2. *Clone este repositório e abra-o em seu editor de códigos ;* 
3. *Crie o banco de dados e as tabelas usando o arquivo "FoodFy.sql" ;* 
4. *Configure o arquivo "src/config/db.js" com seu nome de usuário e senha do Postgres ;* 
5. *Popule o banco de dados com o arquivo "seeds.js" (rodar no terminal - node seeds.js) ;* 
6. *Iniciar a aplicação (rodar no terminal - npm start).*
___

## :joystick: Usando Foodfy

_**Recomendações de uso do Foodfy :**_

* *Ao iniciar a aplicação não haverá nenhuma receita ou chefe cadastrados.*
* *Para realizar o cadastro de chefes e receitas pela primeira vez :*
   * *No banco de dados copiar e-mail de acesso de um usuário marcado como "true" no campo is_admin ;*
   * *Efetuar o login. A senha padrão é "1234" ;*
   * *É preciso criar um chefe antes de adicionar uma receita ;*
   * *Depois de criar um chefe, crie uma receita.*
* *O usuário administrador pode criar mais usuários. Para isso é necessário configurar o arquivo "src/lib/mailer.js" com seus dados. O mesmo vale para a modificação ou recuperação de senha.*
___

## :warning: Atenção Rocketseat

_**Ao Time da Rocketseat:**_
*Por favor, ao utilizar a aplicação, efetue o login como usuário administrativo e também como usuário comum. Muitas funcionalidades e botões permaneceram ocultos quando um usuário comum estiver logado.*
___

## :handshake: Agradecimentos

*Gostaria de agradecer a todo time da Rocketseat pelas aulas fornecidas e pelo ambiente amistoso criado no grupo do Discord. Um agradecimento ao [Guilherme](https://github.com/GuilhermeB-Silva) pela troca de ideias e pela ajuda e tambem ao [Luiz](https://github.com/luizbatanero) quem me apresentou à Rocketseat.*

*Também quero agradecer ao Saudoso Professor [Gustavo Guanabara](https://github.com/gustavoguanabara) cujo projeto gratuito e maravilhoso proporcionou o meu primeiro contato com o mundo da programação.*
___

## :balance_scale: Licença
*Este projeto está sob a **Licença MIT**. Para mais informações ou dúvidas, por favor acesse a [LICENÇA](LICENSE).*
