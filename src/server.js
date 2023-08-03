//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Usuario } from './models/Usuario.js'


const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)

const HOST = 'localhost'
const port = 5000

//endpoint inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!')
});

app.post('/usuario', async (req, res) => {
  // desestrturação do body para acessar os atributos do objeto que será enviado via post
    const { nodemon, idade, ativo, email } = req.body;

  // crio o objeto usuario copiado do objeto body
    const usuario = { nodemon, idade, ativo, email };

    const usuarioDB = await Usuario.create(usuario);
    res.status(201).json({
      data: usuarioDB,
      msg:"Usuário criado com sucesso"
    })
});

app.get('/usuarios', async (req, res) => {

  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
})

app.get('/usuario/:id', async (req, res) => {
  const id = req.params.id;

  const usuario = await Usuario.findOne({_id: id});
  res.status(200).json(usuario);
})

app.delete('/usuario/:id', async (req,res) => {
  const id = req.params.id;
  const usuarioBD = await Usuario.findOne({_id: id});
  const deletar = await Usuario.deleteOne({_id: usuarioBD.id});

res.status(200).json('Usuário deletado com sucesso')
})

app.put('/usuario/:id', async (req, res) => {
  const { nome, idade, ativo, email } = req.body;
  const usuario = { nome, idade, ativo, email };

  const usuarioDB = await Usuario.create(usuario);

  res.status(201).json({
    data: usuarioDB,
    msg: "Usuário criado com sucesso!",
  });

})

const DB_USER= process.env.DB_USER
const DB_PASS= process.env.DB_PASS

console.log(DB_USER, DB_PASS);

//conectando no banco Mongo Atlas
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vusmgxh.mongodb.net/dc_fs12?retryWrites=true&w=majority`)
.then(() =>{
    console.log('BD conectado com sucesso!');
})
.catch(error => {
    console.log('Erro ao conectar banco de dados.', error);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`)
})
