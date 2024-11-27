import { PrismaClient, Usuario } from '@prisma/client'; // Aqui importa-se o tipo do modelo
import { encryptAES, decryptAES } from '../utils/crypto';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class UsuarioController {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, senha, telefone } = req.body;

      const emailExistente = await prisma.usuario.findUnique({ where: {email: email}});

      if (emailExistente) {
        res.status(400).json({
          error: 'Essa conta de e-mail já foi cadastrada, por favor, digite outra.',
        })
        return;
      }

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]).{12,}$/;

      if (!regex.test(senha)) {
          res.status(400).json({
          error: 'A senha deve ter pelo menos 12 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
        })
        return;
      }
      // const senhaCriptografada = await bcrypt.hash(senha, 10);
      const senhaCriptografada = encryptAES(senha);  // Criptografa a senha
      const telefoneCriptografado = telefone ? encryptAES(telefone) : null;


      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: encryptAES(senhaCriptografada),
          telefone: telefone ? encryptAES(telefone) : null,
        },
      });

      res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();
      
      // Tipando o parametro usuario como Usuario
      const usuariosDescriptografados = usuarios.map((usuario: Usuario) => ({
        ...usuario,
        telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
      }));

      res.json(usuariosDescriptografados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  async listarTodosAtivos(req: Request, res: Response) {
    try {

      const usuarios = await prisma.usuario.findMany({where: { esquecido: true }});
      
      // Tipando o parametro usuario como Usuario
      const usuariosDescriptografados = usuarios.map((usuario: Usuario) => ({
        ...usuario,
        telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
      }));

      res.json(usuariosDescriptografados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }


  async listarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
  
      const usuario = await prisma.usuario.findUnique({
        where: { id: id.toString() },
      });
  
      if (!usuario) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
  
      // Descriptografando o telefone, se presente
      const usuarioDescriptografado = {
        ...usuario,
        telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
      };
  
      res.json(usuarioDescriptografado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuário' });
    }
  }
  
  

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, telefone } = req.body;

      const usuario = await prisma.usuario.update({
        where: { id },
        data: {
          nome,
          telefone: telefone ? encryptAES(telefone) : undefined,
        },
      });

      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.usuario.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }

  async inativar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuarioEsquecido = await prisma.usuario.findUnique ({ where: { id: id } });
      const esquecido = usuarioEsquecido?.esquecido;

      if(esquecido == true) {
        const usuario = await prisma.usuario.update({
          where: { id },
          data: { esquecido: false },
        });
        res.json(usuario);
      } else{
        const usuario = await prisma.usuario.update({
          where: { id },
          data: { esquecido: true },
        });
        res.json(usuario);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao inativar usuário' });
    }
  }
};

export default new UsuarioController();