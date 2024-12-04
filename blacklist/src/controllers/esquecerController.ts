import { Request, Response } from 'express';
import EsquecerService from '../services/esquecerServices';

class BlacklistController {
  // Criar uma nova entrada de "esquecido"
  async criar(req: Request, res: Response) {
    const { id_usuario, motivo } = req.body;

    try {
      // Chama o serviço para criar a entrada na blacklist
      const esquecido = await EsquecerService.criarEsquecido(id_usuario, motivo);
      res.status(201).json({ message: 'Usuário esquecido com sucesso', esquecido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao esquecer o usuário', error });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const esquecidos = await EsquecerService.listarEsquecidos();
      res.status(200).json(esquecidos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar usuários esquecidos', error });
    }
  }

  async importarUsuario(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const usuarioCriado = await EsquecerService.importarUsuario(email, senha);

      res.status(201).json({
        message: 'Usuário importado com sucesso.',
        usuario: usuarioCriado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json();
    }
  }
}

export default new BlacklistController();
