Site E.E. Prof. Dr. Décio Ferraz Alvim

Projeto Full Stack desenvolvido para a E.E. Prof. Dr. Décio Ferraz Alvim. A proposta é criar um site para apresentar informações da escola, notícias, projetos e outros conteúdos importantes para alunos, responsáveis e toda a comunidade escolar.

---

Sobre o projeto

O projeto é dividido em duas partes principais:

- Frontend: responsável pela interface que o usuário acessa e utiliza.
- Backend: responsável pela API, autenticação e gerenciamento das informações.

Também é utilizado um banco de dados para armazenar as notícias cadastradas.

Como funciona

Usuário
    ↓
Frontend
    ↓
API
    ↓
FastAPI
    ↓
SQLite

O usuário acessa o site pelo frontend. Quando precisa consultar ou alterar alguma informação, o frontend se comunica com o backend por meio de requisições HTTP.

---

Frontend

O frontend reúne a parte visual do site e os recursos com os quais o usuário interage.

Tecnologias

- HTML5
- CSS3
- JavaScript

Responsabilidades

- Exibir as páginas do site
- Criar a interface de navegação
- Apresentar as notícias
- Interagir com a API
- Enviar requisições ao backend
- Exibir as informações recebidas do servidor

---

Backend

O backend foi desenvolvido com Python e FastAPI.

Ele funciona como uma API que recebe as requisições do frontend, processa os dados e se comunica com o banco de dados.

Tecnologias

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT para autenticação
- SQLite

---

Sistema de autenticação

O sistema possui autenticação para proteger as operações administrativas.

O administrador realiza o login por meio da rota:

POST /api/login

Após o login, o backend gera um token de autenticação. Esse token é usado para autorizar as operações administrativas.

As operações protegidas são:

- Criar notícias
- Editar notícias
- Excluir notícias

---

API de notícias

A API possui as seguintes rotas:

Método| Endpoint| Função| Autenticação
GET| "/"| Verifica se o backend está funcionando| Não
POST| "/api/login"| Realiza o login| Não
GET| "/api/noticias"| Lista as notícias| Não
POST| "/api/noticias"| Cria uma notícia| Sim
PUT| "/api/noticias/{id}"| Edita uma notícia| Sim
DELETE| "/api/noticias/{id}"| Exclui uma notícia| Sim

---

Banco de dados

O projeto utiliza SQLite para armazenar as informações.

A tabela principal é:

noticias
│
├── id
├── titulo
└── conteudo

Exemplo

ID: 1

Título:
Bem-vindos ao novo site da escola

Conteúdo:
A EE Professor Dr. Décio Ferraz Alvim
está com um novo site.

O acesso ao banco de dados é feito utilizando SQLAlchemy.

---

Estrutura do projeto

Uma possível organização do projeto é:

projeto/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── auth.py
│   └── noticias.db
│
└── README.md

Backend

"main.py"

É o arquivo principal da API. Nele ficam as rotas e a configuração do FastAPI.

"database.py"

Responsável pela configuração da conexão com o banco de dados.

"models.py"

Define os modelos utilizados pelo banco de dados.

"auth.py"

Reúne as funções relacionadas à autenticação, incluindo a criação e a verificação dos tokens.

"noticias.db"

É o banco de dados SQLite utilizado pelo projeto.

---

Como executar o backend

Primeiro, instale as dependências:

pip install fastapi uvicorn sqlalchemy python-multipart

Depois, execute o servidor:

uvicorn main:app --reload

O backend ficará disponível em:

http://127.0.0.1:8000

---

Documentação da API

O FastAPI gera automaticamente uma documentação interativa.

Depois de iniciar o servidor, acesse:

http://127.0.0.1:8000/docs

Nessa página, é possível visualizar e testar as rotas da API.

---

Objetivos do projeto

- Criar um site para a escola
- Facilitar o acesso às informações escolares
- Criar um sistema de notícias
- Desenvolver uma API própria
- Utilizar um banc