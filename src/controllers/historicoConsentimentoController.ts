import { Request, Response } from 'express';
import HistoricoConsentimentoService from '../services/historicoConsentimentoService';

class HistoricoConsentimentoController {
  async criar(req: Request, res: Response) {
    const { id_usuario, id_termo, aceito } = req.body;
    try {
      const novoConsentimento = await HistoricoConsentimentoService.criarHistoricoConsentimento(id_usuario, id_termo, aceito);
      res.status(201).json(novoConsentimento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar histórico de consentimento', error });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const consentimentos = await HistoricoConsentimentoService.listarHistoricos();
      res.status(200).json(consentimentos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar históricos de consentimento', error });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const consentimento = await HistoricoConsentimentoService.obterHistoricoPorId(id);
      if (consentimento) {
        res.status(200).json(consentimento);
      } else {
        res.status(404).json({ message: 'Histórico de consentimento não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter histórico de consentimento', error });
    }
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { aceito } = req.body;
    try {
      const consentimentoAtualizado = await HistoricoConsentimentoService.atualizarHistorico(id, aceito);
      res.status(200).json(consentimentoAtualizado);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar histórico de consentimento', error });
    }
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const consentimentoExcluido = await HistoricoConsentimentoService.excluirHistorico(id);
      res.status(200).json(consentimentoExcluido);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir histórico de consentimento', error });
    }
  }
}

export default new HistoricoConsentimentoController();
