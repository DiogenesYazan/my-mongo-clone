# MyMongoClone 🐾

> Um clone simplificado do MongoDB, criado como projeto inicial de aprendizado full‑stack. 🎓

## 🚀 Visão Geral

Este projeto nasceu para consolidar meus conhecimentos em desenvolvimento **Frontend** e **Backend**, criando um serviço que permite:

* ✅ **Cadastro** e **Login** de usuários (JWT + Cookies).
* 🔐 Geração e uso de **API Keys** para autenticação via header.
* 📂 **CRUD** de documentos JSON exclusivos de cada usuário.
* 🖥️ **Dashboard** interativo para criar, listar, visualizar e excluir seus documentos.

É uma base inicial, perfeita para evoluir e testar novos recursos! 💡

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia                             |
| -------------- | -------------------------------------- |
| Frontend       | Next.js (JavaScript puro), CSS Modules |
| Backend        | Node.js, Express.js                    |
| Banco de Dados | lowdb (arquivo JSON local)             |
| Autenticação   | bcrypt, jsonwebtoken, API Key          |
| Ferramentas    | npm, Git, VS Code                      |

Além disso, utilizei o **ChatGPT o4‑mini‑high** como um verdadeiro professor, tirando dúvidas e guiando o desenvolvimento passo a passo. 🤖🎓

## ⚙️ Como Executar

1. **Clone o repositório**

   ```bash
   git clone https://github.com/DiogenesYazan/my-mongo-clone.git
   cd my-mongo-clone
   ```
2. **Instale as dependências**

   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz:

   ```env
   JWT_SECRET=sua_chave_super_secreta
   ```
4. **Inicie em modo de desenvolvimento**

   ```bash
   npm run dev -p 3030
   ```
5. Abra no navegador: `http://localhost:3030` 👀

6. **Faça o registro e login**


## 🧪Testes da API

Faça os testes da API no Insomnia, Postman ou até mesmo no PowerShell.

```BASH
PS C:\Users\SeuUsuario> Invoke-RestMethod -Uri http://localhost:3030/api/docs `
   -Method POST `
   -Headers @{ "x-api-key" = "Sua_API_KEY"; "Content-Type" = "application/json" } `
   -Body '{ "foo": "bar" }'
```


   
## 📋 Funcionalidades Principais

* **/signup**: formulário de cadastro de usuário.
* **/login**: formulário de login e criação de sessão.
* **/dashboard**: painel completo com:

  * Geração, visão e cópia de **API Key**
  * Editor JSON para **criar** documentos
  * Tabela para **listar**, **ver** e **excluir** seus docs
* **API REST** em `/api/`:

  * `/api/auth/signup` e `/api/auth/login`
  * `/api/api-key` (GET + POST)
  * `/api/docs` (GET + POST)
  * `/api/docs/:id` (PUT + DELETE)

## 📖 Aprendizado e Próximos Passos

Este é um **projeto inicial**, focado em:

* 💬 Entender a integração de **rotas** no Next.js.
* 🔐 Dominar **JWT** e **API Key** para autenticação.
* 📂 Praticar operações **CRUD** em um banco JSON.
* 🎨 Aplicar **CSS Modules** para estilização.

Próximos desejos:

* 🧪 Adicionar **testes automatizados** (Jest/Supertest).
* 🚀 Implantar em nuvem (Vercel, Heroku ou AWS).

## 🤝 Contribuições

Pull requests são bem‑vindos! Se tiver sugestões de melhorias, fique à vontade. 👐

---

*OBS: Este projeto foi criado com o ❤️ e a ajuda do ChatGPT (modelo o4‑mini‑high)*
