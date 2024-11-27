import { Request, Response } from 'express';
import BackupService from '../services/backupService';

class BackupController {
  async criar(req: Request, res: Response) {
    const { arquivo } = req.body;
    try {
      const novoBackup = await BackupService.criarBackup(arquivo);
      res.status(201).json(novoBackup);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar backup', error });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const backups = await BackupService.listarBackups();
      res.status(200).json(backups);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar backups', error });
    }
  }

  async obterPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const backup = await BackupService.obterBackupPorId(id);
      if (backup) {
        res.status(200).json(backup);
      } else {
        res.status(404).json({ message: 'Backup não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter backup', error });
    }
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const backupExcluido = await BackupService.excluirBackup(id);
      res.status(200).json(backupExcluido);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir backup', error });
    }
  }
}

export default new BackupController();
