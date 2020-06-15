const express = require('express');
const server = express();

//Query = ?nome=1
/*server.get('/rota/', (req, res) =>{
  const nome = req.query.nome;

  return res.json({message: `Nome: ${nome}`});
});*/


//Route = /users/1
/*server.get('/rota/:id', (req, res) =>{
  const id = req.params.id;
  //localhost:3000/rota/3
  return res.json({message: `ID Number: ${id}`});
});*/


//Request body = {"name": Daniel, "e-mail": daniel.cassiano@gmail.com}

const users = ['Daniel0', 'Cassiano1', 'Daniel2']; //INDEXs: [0,1,2]

server.get('/usuarios/:index', (req, res) =>{
  const { index } = req.params;

  return res.json({message: `Array Index Number: ${users[index]}`});
});

server.listen(3000);