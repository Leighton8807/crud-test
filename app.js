const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [];

//operaciones CRUD
app.get('/todos', (req, res)=>{
    res.json(todos);
});

app.post('/todos', (req, res) =>{
    const newAll = req.body;
    todos.push(newAll);
    res.status(201).json(newAll);
});

 app.put('/todos/:id', (req, res)=>{
    const id = req.params.id;
    const updateAll = req.body;
    todos[id] = updateAll;
    res.json(updateAll);
});


app.delete('/todos/:id', (req, ers)=>{
    const id = req.params.id;
    todos.splice(id,1);
    res.sendStatus(204);
});


app.listen(port, ()=>{
    console.log(`server listen on port: ${port}`);
});

module.exports = app;