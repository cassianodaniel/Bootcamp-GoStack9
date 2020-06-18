const express = require('express');
const server = express();
server.use(express.json());

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

/*
const users = ['Daniel0', 'Cassiano1', 'Daniel2']; //INDEXs: [0,1,2]

server.get('/usuarios/:index', (req, res) =>{
  const { index } = req.params;

  return res.json({message: `Array Index Number: ${users[index]}`});
});
*/

//MIDDLEWARE

function CheckUserName(req,res,next){
  if(!req.body.name){
    return res.status(400).json({ error: 'User name required. Bad request!' });
  }else{
    return next();
  }
};

function CheckArray(req,res,next){
  const user = users[req.params.index];
  if(!users[req.params.index]){
    return res.status(400).json({ error: 'Empty slot in array. Bad request!' });
  }else{
    req.user = user;
    return next();
  }
}

server.use((req,res,next) => {
    console.log(`Middleware Console.log-NEXT`);
    console.log(`Método utilizado: ${req.method}, URL: ${req.url}`);
    return next(); //Executando próximo middleware
});

const users = ['Daniel0', 'Cassiano1', 'Daniel2']; //INDEXs: [0,1,2]

server.get('/users', (req,res) => { //Retorne todos usuários
    return res.json(users);
});

server.get('/users/:index', CheckArray, (req,res) => { //Retorne o slot do array index
    const { index } = req.params;
    return res.json(req.user); 
});

server.post('/users', CheckUserName, (req,res) => { //Pegue a variável "name", da requisição body (req.body)
    const { name } = req.body;
    users.push(name);
    
    return res.json(users);
});

server.put('/users/:index', CheckUserName, CheckArray, (req,res) => { //Editar nome
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', (req, res) => { //Apague o último elemento do array
    const { index } = req.params;
    users.splice(index, 1); //delete um slot no array index
    return res.json(users);
});



server.listen(3000);