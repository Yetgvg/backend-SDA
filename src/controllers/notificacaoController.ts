import { Request, Response } from 'express';
import NotificacaoService from '../services/notificacaoService';

class NotificacaoController {
  async criar(req: Request, res: Response) {
    const { id_usuario, mensagem } = req.body;
    try {
      const novaNotificacao = await NotificacaoService.criarNotificacao(id_usuario, mensagem);
      res.status(201).json(novaNotificacao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar notificação', error });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const notificacoes = await NotificacaoService.listarNotificacoes();
      res.status(200).json(notificacoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar notificações', error });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const notificacao = await NotificacaoService.obterNotificacaoPorId(id);
      if (notificacao) {
        res.status(200).json(notificacao);
      } else {
        res.status(404).json({ message: 'Notificação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter notificação', error });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { lida } = req.body;
    try {
      const notificacaoAtualizada = await NotificacaoService.atualizarNotificacao(id, lida);
      res.status(200).json(notificacaoAtualizada);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar notificação', error });
    }
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const notificacaoExcluida = await NotificacaoService.excluirNotificacao(id);
      res.status(200).json(notificacaoExcluida);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir notificação', error });
    }
  }
}

export default new NotificacaoController();
