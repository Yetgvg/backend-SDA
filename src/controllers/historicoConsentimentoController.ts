import { Request, Response } from 'express';
import historicoConsentimentoService from '../services/historicoConsentimentoService';


class HistoricoConsentimentoController {
  async criar(req: Request, res: Response) {
    const { id_usuario, id_termo, aceito, confirmado } = req.body;
    try {
      const novoConsentimento = await historicoConsentimentoService.criarHistoricoConsentimento(id_usuario, id_termo, aceito, confirmado);
      res.status(201).json(novoConsentimento);
    } catch (error) {
      // Asserção de tipo para 'Error'
      res.status(500).json({ message: 'Erro ao criar histórico de consentimento', error: (error as Error).message });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const consentimentos = await historicoConsentimentoService.listarHistoricos();
      res.status(200).json(consentimentos);
    } catch (error) {
      // Asserção de tipo para 'Error'
      res.status(500).json({ message: 'Erro ao listar históricos de consentimento', error: (error as Error).message });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const consentimento = await historicoConsentimentoService.obterHistoricoPorId(id);
      if (consentimento) {
        res.status(200).json(consentimento);
      } else {
        res.status(404).json({ message: 'Histórico de consentimento não encontrado' });
      }
    } catch (error) {
      // Asserção de tipo para 'Error'
      res.status(500).json({ message: 'Erro ao obter histórico de consentimento', error: (error as Error).message });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { aceito } = req.body;
    try {
      const consentimentoAtualizado = await historicoConsentimentoService.atualizarHistorico(id, aceito);
      res.status(200).json(consentimentoAtualizado);
    } catch (error) {
      // Asserção de tipo para 'Error'
      res.status(500).json({ message: 'Erro ao atualizar histórico de consentimento', error: (error as Error).message });
    }
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const consentimentoExcluido = await historicoConsentimentoService.excluirHistorico(id);
      res.status(200).json(consentimentoExcluido);
    } catch (error) {
      // Asserção de tipo para 'Error'
      res.status(500).json({ message: 'Erro ao excluir histórico de consentimento', error: (error as Error).message });
    }
  }
}

export default new HistoricoConsentimentoController();
