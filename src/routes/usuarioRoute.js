import express from "express"
import { UsuarioController } from "../controllers/usuarioController.js";

export const routerUsuario = express.Router();

routerUsuario
.post("/usuario", UsuarioController.inserir)
.get("/usuarios", UsuarioController.buscarTodos)
.get("/usuario/:id", UsuarioController.buscarPorId)
.put("/usuario/:id", UsuarioController.atualizar)
.delete("/usuario/:id", UsuarioController.excluir)