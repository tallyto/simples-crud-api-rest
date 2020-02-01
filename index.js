const express = require("express");
const server = express();

//API REST
//CRUD - CREATE, READ, UPDATE, DELETE

server.use(express.json());

const users = ["Tallyto", "Gustavo", "David"];

//Verifica se existe usuario na posição
function checkUsersInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }
  return next();
}
//Verifica se o nome é enviado no corpo da requisição
function checkUsersExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Username is required" });
  }
  return next();
}

//Lista todos os usuários
server.get("/users", (req, res) => {
  res.json(users);
});

//Mostra um usuário baseado na posição do vetor
server.get("/users/:index", checkUsersInArray, (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

//Criar um novo usuario
server.post("/users", checkUsersExist, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//Edita um usuario
server.put("/users/:index", checkUsersExist, checkUsersInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
});

//Remove um usuario
server.delete("/users/:index", checkUsersInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen("3001", () => {
  console.log("Server running at http://localhost:3001");
});
