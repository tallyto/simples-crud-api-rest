const express = require("express");
const server = express();

//API REST
//CRUD - CREATE, READ, UPDATE, DELETE

server.use(express.json());

const users = ["Tallyto", "Gustavo", "David"];

//Lista todos os usuários
server.get("/users", (req, res) => {
  res.json(users);
});

//Mostra um usuário baseado na posição do vetor
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

//Criar um novo usuario
server.post("/users", (req, res) => {
  const { name } = req.body;
  console.log(name);
  return res.json(users);
});

//Edita um usuario
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
});

//Remove um usuario
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen("3001", () => {
  console.log("Server running at http://localhost:3001");
});
