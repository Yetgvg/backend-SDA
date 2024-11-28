import { Request, Response } from 'express';
import ExportacaoService from '../services/exportacaoService';

class ExportacaoController {
  async criar(req: Request, res: Response) {
    const { id_usuario, formato } = req.body;
    try {
      const novaExportacao = await ExportacaoService.criarExportacao(id_usuario, formato);
      res.status(201).json(novaExportacao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar exportação', error });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const exportacoes = await ExportacaoService.listarExportacoes();
      res.status(200).json(exportacoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar exportações', error });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const exportacao = await ExportacaoService.obterExportacaoPorId(id);
      if (exportacao) {
        res.status(200).json(exportacao);
      } else {
        res.status(404).json({ message: 'Exportação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter exportação', error });
    }
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const exportacaoExcluida = await ExportacaoService.excluirExportacao(id);
      res.status(200).json(exportacaoExcluida);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir exportação', error });
    }
  }

  async exportarPDF(req: Request, res: Response) {
    const { id_usuario } = req.params;
  
    try {
      const pdfBuffer = await ExportacaoService.gerarPDF(id_usuario);
  
      const formato = 'PDF';
      await ExportacaoService.criarExportacao(id_usuario, formato);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="dados_portabilidade.pdf"');
      res.send(pdfBuffer);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao exportar PDF', error });
    }
  }
}

export default new ExportacaoController();