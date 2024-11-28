import { Request, Response } from 'express';
import BackupService from '../services/backupService';

class BackupController {
  async criarBackupDeTudo(req: Request, res: Response) {
    try {
      const backups = await BackupService.criarBackupDeTudo();
      res.status(201).json(backups);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async criarBackupSeparado(req: Request, res: Response) {
    try {
      const { tabela } = req.body;
      const backup = await BackupService.criarBackupSeparado(tabela);
      res.status(201).json(backup);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async listarBackups(req: Request, res: Response) {
    try {
      const backups = await BackupService.listarBackups();
      res.status(200).json(backups);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async obterBackupPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const backup = await BackupService.obterBackupPorId(id); // Chama o serviço
      res.status(200).json(backup); // Retorna o backup com o arquivo descriptografado
    } catch (error) {
      res.status(404).json({ error: error }); // Retorna o erro com a mensagem
    }
  }
  

  async excluirBackup(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const backupExcluido = await BackupService.excluirBackup(id);
      res.status(200).json(backupExcluido);
    } catch (error) {
      res.status(404).json({ error: "Erro" });
    }
  }
}

export default new BackupController();