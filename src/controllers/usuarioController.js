import { Usuario } from "../models/Usuario.js";

export class UsuarioController {
    static inserir = async (req, res) => {
        // desestrturação do body para acessar os atributos do objeto que será enviado via post
        const { nodemon, idade, ativo, email } = req.body;
      
        // crio o objeto usuario copiado do objeto body
        const usuario = { nodemon, idade, ativo, email };
      
        const usuarioDB = await Usuario.create(usuario);
        res.status(201).json({
          data: usuarioDB,
          msg: "Usuário criado com sucesso",
        });
      }
    static atualizar = async (req, res) => {
        const { nome, idade, ativo, email } = req.body;
        const usuario = { nome, idade, ativo, email };
        const id = req.params.id;
      
        await Usuario.updateOne({ _id: id }, usuario);
        res.status(200).json("Usuário atualizado");
      }
    static buscarTodos = async (req, res) => {
        const usuarios = await Usuario.find();
      
        if (usuarios.length === 0) {
          res.status(422).json({ msg: "Nenhum usuário encontrado!" });
        } else {
          res.status(200).json(usuarios);
        }
      
        res.status(200).json(usuarios);
      }
    static buscarPorId = async (req, res) => {
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
      }
    static excluir =  async (req, res) => {
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
      }

}