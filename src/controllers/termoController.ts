import { Request, Response } from 'express';
import TermoService from '../services/termoService';

class TermoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const { versao, itens_obrigatorios, itens_opcionais } = req.body;
      const novoTermo = await TermoService.criarTermo(versao, itens_obrigatorios, itens_opcionais);
      res.status(201).json(novoTermo);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar termo', error });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const termos = await TermoService.listarTermos();
      res.status(200).json(termos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar termos', error });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const termo = await TermoService.obterTermoPorId(id);
      if (termo) {
        res.status(200).json(termo);
      } else {
        res.status(404).json({ message: 'Termo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter termo', error });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { versao, itens_obrigatorios, itens_opcionais } = req.body;
      const termoAtualizado = await TermoService.atualizarTermo(id, versao, itens_obrigatorios, itens_opcionais);
      res.status(200).json(termoAtualizado);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar termo', error });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const termoExcluido = await TermoService.excluirTermo(id);
      res.status(200).json(termoExcluido);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir termo', error });
    }
  }
}

export default new TermoController();
