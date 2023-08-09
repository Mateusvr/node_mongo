//const express = require('express')
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Usuario } from "./models/Usuario.js";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const HOST = "localhost";
const port = 5000;

//endpoint inicial
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.post("/usuario", async (req, res) => {
  // desestrturação do body para acessar os atributos do objeto que será enviado via post
  const { nodemon, idade, ativo, email } = req.body;

  // crio o objeto usuario copiado do objeto body
  const usuario = { nodemon, idade, ativo, email };

  const usuarioDB = await Usuario.create(usuario);
  res.status(201).json({
    data: usuarioDB,
    msg: "Usuário criado com sucesso",
  });
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();

  if (usuarios.length === 0) {
    res.status(422).json({ msg: "Nenhum usuário encontrado!" });
  } else {
    res.status(200).json(usuarios);
  }

  res.status(200).json(usuarios);
});

app.get("/usuario/:id", async (req, res) => {
  const id = req.params.id;

  //verifica se o id passado na url é válido, conforme o exemplo: 64caf83a7808b7db1207b360. O _id do Mongo possui 24 caracteres, ou seja, só pode realizar a busca (linha 54), se o tamanho for válido.
  if (id.length !== 24) {
    res.status(422).json("Tamanho inválido");
    return;
  }
  //Se o tamanho do id for válido, realiza a busca no banco
  const usuario = await Usuario.findOne({ _id: id });
  //Tratamento, caso nenhum usuário com o id fornecido for encontrado
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(200).json("usuário não encontrado");
  }
});

app.delete("/usuario/:id", async (req, res) => {
  const id = req.params.id;

  if (id.length !== 24) {
    res.status(422).json("Tamanho inválido");
    return;
  }

  const usuarioBD = await Usuario.findOne({ _id: id });

  if (usuarioBD) {
    await Usuario.deleteOne({ _id: usuarioBD.id });
    res.status(200).json("Usuário deletado com sucesso");
  } else {
    res.status(200).json("usuário não encontrado");
  }
});

app.put("/usuario/:id", async (req, res) => {
  const { nome, idade, ativo, email } = req.body;
  const usuario = { nome, idade, ativo, email };
  const id = req.params.id;

  await Usuario.updateOne({ _id: id }, usuario);
  res.status(200).json("Usuário atualizado");
});

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

console.log(DB_USER, DB_PASS);

//conectando no banco Mongo Atlas
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vusmgxh.mongodb.net/dc_fs12?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("BD conectado com sucesso!");
  })
  .catch((error) => {
    //console.log("Erro ao conectar banco de dados.", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`);
});
