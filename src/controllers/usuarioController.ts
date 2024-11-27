import { Request, Response } from 'express';
import usuarioService from '../services/usuarioService';

class UsuarioController {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, senha, telefone, cpf, role  } = req.body;
      const usuario = await usuarioService.criar(nome, email, senha, telefone, cpf, role);
      res.status(201).json(usuario);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      } else {
        // Caso o erro não seja uma instância de Error
        res.status(500).json({ error: 'Erro desconhecido.' });
      }
    }
  }

  async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  async listarTodosAtivos(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodosAtivos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários ativos' });
    }
  }

  async listarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.listarUsuario(id);
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Não foi possível listar os usuários" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, telefone } = req.body;
      const usuario = await usuarioService.atualizar(id, nome, telefone);
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await usuarioService.excluir(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }

  async inativar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.inativar(id);
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao inativar usuário' });
    }
  }
}

export default new UsuarioController();
